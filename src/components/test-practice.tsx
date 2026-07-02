"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import {
  faArrowLeft,
  faArrowRight,
  faBookOpen,
  faCheck,
  faCircleQuestion,
  faClipboardList,
  faRotateRight,
  faShieldHalved,
  faUserLock,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import questionsData from "@/data/questions-sample.json";

type Question = (typeof questionsData.questions)[number];
type PracticeMode = "test" | "case";
type PracticeStep = "modules" | "tests" | "questions";
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

const moduleNames: Record<string, string> = {
  "1": "Elementos de Derecho civil",
  "2": "Elementos de Derecho mercantil",
  "3": "Elementos de Derecho laboral",
  "4": "Elementos de Derecho fiscal",
  "5": "Gestión comercial y financiera de la empresa",
  "6": "Acceso a los mercados",
  "7": "Normas y explotación técnicas",
  "8": "Seguridad vial",
};

function repairText(value: string) {
  const normalized = value.replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
  if (!/[ÃƒÃ‚Ã¢]/.test(normalized)) return normalized;

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

function modeLabel(mode: PracticeMode) {
  return mode === "case" ? "Casos" : "Preguntas";
}

export function TestPractice({ isAuthenticated = false, userName }: TestPracticeProps) {
  const [step, setStep] = useState<PracticeStep>("modules");
  const [module, setModule] = useState(questionsData.modules[0] || "1");
  const [loadedModule, setLoadedModule] = useState(module);
  const [mode, setMode] = useState<PracticeMode>("test");
  const [testNumber, setTestNumber] = useState(1);
  const [moduleTotal, setModuleTotal] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(questionsData.questions);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [answeredIds, setAnsweredIds] = useState<Set<number>>(() => new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const questionsByModule = useMemo(
    () => questions.filter((question) => question.module === loadedModule),
    [loadedModule, questions],
  );
  const modeQuestions = useMemo(
    () => questionsByModule.filter((question) => (question.mode || "test") === mode),
    [mode, questionsByModule],
  );
  const testQuestions = useMemo(() => {
    const start = (testNumber - 1) * 50;
    return modeQuestions.slice(start, start + 50);
  }, [modeQuestions, testNumber]);
  const question: Question = testQuestions[index % Math.max(testQuestions.length, 1)] || modeQuestions[0] || questionsData.questions[0];
  const attempts = score.correct + score.wrong;
  const successRate = attempts ? Math.round((score.correct / attempts) * 100) : 0;
  const currentAnswered = answeredIds.has(question.id);
  const totalTests = Math.max(1, Math.ceil(modeQuestions.length / 50));
  const currentPosition = Math.min(index + 1, testQuestions.length || 1);

  useEffect(() => {
    const saved = window.localStorage.getItem("tt-test-progress");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as {
        module?: string;
        mode?: PracticeMode;
        testNumber?: number;
        index?: number;
        score?: { correct: number; wrong: number };
      };
      startTransition(() => {
        if (parsed.module) setModule(parsed.module);
        if (parsed.mode) setMode(parsed.mode);
        if (typeof parsed.testNumber === "number") setTestNumber(parsed.testNumber);
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
      JSON.stringify({ module, mode, testNumber, index, score, updatedAt: new Date().toISOString() }),
    );
  }, [module, mode, testNumber, index, score]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/questions?module=${encodeURIComponent(module)}&limit=600`, {
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

  function selectModule(nextModule: string, nextMode: PracticeMode) {
    setModule(nextModule);
    setMode(nextMode);
    setTestNumber(1);
    setIndex(0);
    setSelected("");
    setChecked(false);
    setScore({ correct: 0, wrong: 0 });
    setAnsweredIds(new Set());
    setStep("tests");
  }

  function startTest(nextTest: number) {
    setTestNumber(nextTest);
    setIndex(0);
    setSelected("");
    setChecked(false);
    setAnsweredIds(new Set());
    setStep("questions");
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
    if (!testQuestions.length) return;
    setIndex((value) => Math.min(value + 1, testQuestions.length - 1));
    setSelected("");
    setChecked(false);
  }

  function resetSession() {
    setStep("modules");
    setModule(questionsData.modules[0] || "1");
    setMode("test");
    setTestNumber(1);
    setIndex(0);
    setSelected("");
    setChecked(false);
    setScore({ correct: 0, wrong: 0 });
    setAnsweredIds(new Set());
    window.localStorage.removeItem("tt-test-progress");
  }

  return (
    <section className="test-app test-app--wide" aria-labelledby="test-app-heading">
      <header className="test-step-head">
        <div>
          <p className="tt-label">Plataforma Test</p>
          <h2 id="test-app-heading">Practica por grupos, tests y preguntas</h2>
          <p>
            Cada test de grupo tiene 50 preguntas. Correcta +1 · error descuenta -1/3 · mínimo 25 puntos para aprobar.
          </p>
        </div>
        <aside className="test-user-card">
          <FontAwesomeIcon icon={isAuthenticated ? faShieldHalved : faUserLock} />
          <div>
            <strong>{isAuthenticated ? `Sesión iniciada${userName ? `: ${userName}` : ""}` : "Modo invitado"}</strong>
            <span>{isAuthenticated ? "Tu cuenta está preparada para vincular progreso." : "Practica gratis. Inicia sesión para futuras métricas guardadas."}</span>
          </div>
        </aside>
      </header>

      {error ? (
        <div className="test-error" role="alert">
          <strong>No se ha podido cargar el banco completo.</strong>
          <span>{error} Se mantiene una muestra local para que puedas seguir practicando.</span>
        </div>
      ) : null}

      {step === "modules" ? (
        <div className="test-module-list">
          {questionsData.modules.map((item) => {
            const moduleQuestions = questionsData.questions.filter((question) => question.module === item);
            const hasCases = moduleQuestions.some((question) => question.mode === "case");
            return (
              <article key={item} className="test-module-row">
                <div>
                  <strong>Grupo {item}. {moduleNames[item] || `Módulo ${item}`}.</strong>
                </div>
                <div>
                  <button type="button" onClick={() => selectModule(item, "test")}>
                    Preguntas
                  </button>
                  <button type="button" onClick={() => selectModule(item, "case")} disabled={!hasCases}>
                    Casos
                  </button>
                </div>
              </article>
            );
          })}
          <article className="test-final-row">
            <h3>Examen final</h3>
            <p>200 preguntas. Correcta +1 · error descuenta -1/3 · mínimo 100 puntos para aprobar.</p>
            <button type="button" onClick={() => selectModule("1", "test")}>Empezar examen</button>
          </article>
        </div>
      ) : null}

      {step === "tests" ? (
        <div className="test-picker">
          <div className="test-picker__head">
            <button type="button" onClick={() => setStep("modules")}>
              <FontAwesomeIcon icon={faArrowLeft} />
              Volver al temario
            </button>
            <div>
              <p className="tt-label">Grupo {module} · {modeLabel(mode)}</p>
              <h3>{moduleNames[module] || `Módulo ${module}`}</h3>
              <p>{modeQuestions.length || moduleTotal} preguntas disponibles, organizadas en tests de 50.</p>
            </div>
          </div>
          <div className="test-table" role="table" aria-label={`Tests del grupo ${module}`}>
            <div role="row">
              <strong>Test</strong>
              <strong>Puntos</strong>
              <strong>Estado</strong>
              <strong>Último</strong>
              <span />
            </div>
            {Array.from({ length: totalTests }, (_, item) => item + 1).map((item) => (
              <div key={item} role="row">
                <span>{String(item).padStart(3, "0")}</span>
                <span>—</span>
                <span>—</span>
                <span>—</span>
                <button type="button" onClick={() => startTest(item)}>
                  Empezar
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {step === "questions" ? (
        <div className="test-question-layout">
          <div className="test-question-top">
            <button type="button" onClick={() => setStep("tests")}>
              <FontAwesomeIcon icon={faArrowLeft} />
              Elegir otro test
            </button>
            <div className="test-stats" aria-label="Resumen de progreso">
              <div><span>{score.correct}</span><small>Aciertos</small></div>
              <div><span>{score.wrong}</span><small>Fallos</small></div>
              <div><span>{successRate}%</span><small>Precisión</small></div>
            </div>
            <button type="button" onClick={resetSession}>
              <FontAwesomeIcon icon={faRotateRight} />
              Reiniciar
            </button>
          </div>

          <article className="question-card question-card--wide" aria-busy={loading}>
            <div className="question-meta">
              <span><FontAwesomeIcon icon={faClipboardList} /> Grupo {module} · Test {String(testNumber).padStart(3, "0")} · Pregunta {currentPosition} de {testQuestions.length || 50}</span>
              <span><FontAwesomeIcon icon={faBookOpen} /> {question.code}</span>
              <span>{repairText(question.law)}</span>
            </div>
            <h3>{repairText(question.prompt)}</h3>
            <div className="answer-list answer-list--wide">
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
                    ].filter(Boolean).join(" ")}
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
            <div className="question-jump" aria-label="Preguntas del test">
              {Array.from({ length: testQuestions.length || 50 }, (_, item) => item).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={item === index ? "active" : answeredIds.has(testQuestions[item]?.id) ? "done" : ""}
                  onClick={() => {
                    setIndex(item);
                    setSelected("");
                    setChecked(false);
                  }}
                >
                  {item + 1}
                </button>
              ))}
            </div>
            <div className="test-actions">
              <button className="tt-btn tt-btn-secondary" type="button" onClick={() => setIndex((value) => Math.max(value - 1, 0))} disabled={loading || index === 0}>
                Anterior
              </button>
              <button className="tt-btn tt-btn-primary" type="button" onClick={selected && !checked ? checkAnswer : nextQuestion} disabled={loading || (!selected && !checked)}>
                {selected && !checked ? "Comprobar" : "Siguiente"}
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
              {checked ? (
                <p className={selected === question.answer ? "result result--ok" : "result result--bad"}>
                  <FontAwesomeIcon icon={selected === question.answer ? faCheck : faCircleQuestion} />
                  Respuesta correcta: <strong>{optionLabel(question.answer)}</strong>
                </p>
              ) : null}
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
