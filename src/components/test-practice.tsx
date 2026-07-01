"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import {
  faArrowRight,
  faBookOpen,
  faCheck,
  faClock,
  faRotateRight,
  faShieldHalved,
  faUserLock,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import questionsData from "@/data/questions-sample.json";

type Question = (typeof questionsData.questions)[number];
type QuestionsResponse = {
  total: number;
  modules: string[];
  module: string;
  moduleTotal: number;
  limit: number;
  offset: number;
  questions: Question[];
};

type TestPracticeProps = {
  isAuthenticated?: boolean;
  userName?: string | null;
};

function repairText(value: string) {
  const normalized = value.replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
  if (!/[ÃÂâ]/.test(normalized)) return normalized;

  try {
    const bytes = Uint8Array.from([...normalized].map((char) => char.charCodeAt(0) & 255));
    return new TextDecoder("utf-8", { fatal: false }).decode(bytes).replace(/\s+/g, " ").trim();
  } catch {
    return normalized;
  }
}

function optionLabel(value: string) {
  return value.toUpperCase();
}

function optionText(key: string, text: string) {
  const label = optionLabel(key);
  return repairText(text).replace(new RegExp(`^${label}\\)\\s*`, "i"), "");
}

export function TestPractice({ isAuthenticated = false, userName }: TestPracticeProps) {
  const [module, setModule] = useState(questionsData.modules[0] || "1");
  const [loadedModule, setLoadedModule] = useState(module);
  const [moduleTotal, setModuleTotal] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(questionsData.questions);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [answeredIds, setAnsweredIds] = useState<Set<number>>(() => new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const moduleQuestions = useMemo(
    () => questions.filter((question) => question.module === loadedModule),
    [loadedModule, questions],
  );
  const question: Question = moduleQuestions[index % Math.max(moduleQuestions.length, 1)] || questionsData.questions[0];
  const visibleCount = moduleQuestions.length;
  const progress = moduleTotal ? Math.round(((index + 1) / moduleTotal) * 100) : 0;
  const attempts = score.correct + score.wrong;
  const successRate = attempts ? Math.round((score.correct / attempts) * 100) : 0;
  const currentAnswered = answeredIds.has(question.id);

  useEffect(() => {
    const saved = window.localStorage.getItem("tt-test-progress");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        module?: string;
        index?: number;
        score?: { correct: number; wrong: number };
      };
      startTransition(() => {
        if (parsed.module) setModule(parsed.module);
        if (typeof parsed.index === "number") setIndex(parsed.index);
        if (parsed.score) setScore(parsed.score);
      });
    } catch {
      window.localStorage.removeItem("tt-test-progress");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "tt-test-progress",
      JSON.stringify({ module, index, score, updatedAt: new Date().toISOString() }),
    );
  }, [module, index, score]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/questions?module=${encodeURIComponent(module)}&limit=200`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("No se pudieron cargar las preguntas.");
        const data = (await response.json()) as QuestionsResponse;
        setQuestions(data.questions.length ? data.questions : questionsData.questions);
        setLoadedModule(data.module);
        setModuleTotal(data.moduleTotal);
        setIndex(0);
        setSelected("");
        setChecked(false);
        setAnsweredIds(new Set());
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "No se pudieron cargar las preguntas.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadQuestions();

    return () => controller.abort();
  }, [module]);

  function changeModule(nextModule: string) {
    if (nextModule === module) return;
    setModule(nextModule);
    setScore({ correct: 0, wrong: 0 });
  }

  function checkAnswer() {
    if (!selected || currentAnswered) {
      setChecked(true);
      return;
    }

    setChecked(true);
    setAnsweredIds((previous) => new Set(previous).add(question.id));
    setScore((previous) =>
      selected === question.answer
        ? { ...previous, correct: previous.correct + 1 }
        : { ...previous, wrong: previous.wrong + 1 },
    );
  }

  function nextQuestion() {
    if (!moduleQuestions.length) return;
    setIndex((value) => (value + 1) % moduleQuestions.length);
    setSelected("");
    setChecked(false);
  }

  function resetSession() {
    setIndex(0);
    setSelected("");
    setChecked(false);
    setScore({ correct: 0, wrong: 0 });
    setAnsweredIds(new Set());
    window.localStorage.removeItem("tt-test-progress");
  }

  return (
    <section className="test-app" aria-labelledby="test-app-heading">
      <div className="test-shell">
        <aside className="test-sidebar" aria-label="Estado de práctica">
          <p className="tt-label">Plataforma Test</p>
          <h2 id="test-app-heading">Practica con preguntas reales</h2>
          <p>
            Banco con {questionsData.total.toLocaleString("es-ES")} preguntas de competencia profesional,
            organizado por módulos y con corrección inmediata.
          </p>

          <div className="test-user-card">
            <FontAwesomeIcon icon={isAuthenticated ? faShieldHalved : faUserLock} />
            <div>
              <strong>{isAuthenticated ? `Sesión iniciada${userName ? `: ${userName}` : ""}` : "Modo invitado"}</strong>
              <span>
                {isAuthenticated
                  ? "Tu práctica queda disponible en este navegador. La sincronización en cuenta llegará con la base de datos."
                  : "Puedes practicar gratis. Inicia sesión para preparar el acceso privado y futuras métricas guardadas."}
              </span>
            </div>
          </div>

          <div className="test-stats" aria-label="Resumen de progreso">
            <div>
              <span>{score.correct}</span>
              <small>Aciertos</small>
            </div>
            <div>
              <span>{score.wrong}</span>
              <small>Fallos</small>
            </div>
            <div>
              <span>{successRate}%</span>
              <small>Precisión</small>
            </div>
          </div>

          <div className="test-progress" aria-label={`Progreso aproximado ${progress}%`}>
            <span style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>

          <button className="test-reset" type="button" onClick={resetSession}>
            <FontAwesomeIcon icon={faRotateRight} />
            Reiniciar práctica
          </button>
        </aside>

        <div className="test-workspace">
          <div className="test-toolbar">
            <div className="module-tabs" aria-label="Seleccionar módulo">
              {questionsData.modules.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={item === module ? "active" : ""}
                  onClick={() => changeModule(item)}
                  disabled={loading}
                >
                  Módulo {item}
                </button>
              ))}
            </div>
            <div className="test-toolbar__meta">
              <FontAwesomeIcon icon={faClock} />
              <span>{loading ? "Cargando..." : `${Math.min(index + 1, visibleCount)} de ${moduleTotal || visibleCount}`}</span>
            </div>
          </div>

          {error ? (
            <div className="test-error" role="alert">
              <strong>No se ha podido cargar el banco completo.</strong>
              <span>{error} Se mantiene una muestra local para que puedas seguir practicando.</span>
            </div>
          ) : null}

          <article className="question-card" aria-busy={loading}>
            <div className="question-meta">
              <span><FontAwesomeIcon icon={faBookOpen} /> {question.code}</span>
              <span>{repairText(question.law)}</span>
            </div>
            <h3>{repairText(question.prompt)}</h3>
            <div className="answer-list">
              {question.options.map((option) => {
                const isSelected = selected === option.key;
                const isCorrect = checked && option.key === question.answer;
                const isWrong = checked && isSelected && option.key !== question.answer;
                return (
                  <button
                    key={option.key}
                    type="button"
                    className={[
                      "answer-option",
                      isSelected ? "selected" : "",
                      isCorrect ? "correct" : "",
                      isWrong ? "wrong" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => {
                      setSelected(option.key);
                      if (!currentAnswered) setChecked(false);
                    }}
                    disabled={loading}
                    aria-pressed={isSelected}
                  >
                    <strong>{optionLabel(option.key)}</strong>
                    <span>{optionText(option.key, option.text)}</span>
                    {isCorrect ? <FontAwesomeIcon icon={faCheck} /> : null}
                    {isWrong ? <FontAwesomeIcon icon={faXmark} /> : null}
                  </button>
                );
              })}
            </div>
            <div className="test-actions">
              <button className="tt-btn tt-btn-primary" type="button" onClick={checkAnswer} disabled={loading || !selected}>
                Comprobar
              </button>
              <button className="tt-btn tt-btn-secondary" type="button" onClick={nextQuestion} disabled={loading}>
                Siguiente pregunta
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
              {checked ? (
                <p className={selected === question.answer ? "result result--ok" : "result result--bad"}>
                  Respuesta correcta: <strong>{optionLabel(question.answer)}</strong>
                </p>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
