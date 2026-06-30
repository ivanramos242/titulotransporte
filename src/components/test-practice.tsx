"use client";

import { useEffect, useMemo, useState } from "react";
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

export function TestPractice() {
  const [module, setModule] = useState(questionsData.modules[0] || "1");
  const [loadedModule, setLoadedModule] = useState(module);
  const [moduleTotal, setModuleTotal] = useState(0);
  const [questions, setQuestions] = useState<Question[]>(questionsData.questions);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const moduleQuestions = useMemo(
    () => questions.filter((question) => question.module === loadedModule),
    [loadedModule, questions],
  );
  const question: Question = moduleQuestions[index % moduleQuestions.length] || questionsData.questions[0];
  const visibleCount = moduleQuestions.length;

  useEffect(() => {
    const controller = new AbortController();

    async function loadQuestions() {
      setLoading(true);

      try {
        const response = await fetch(`/api/questions?module=${encodeURIComponent(module)}&limit=200`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as QuestionsResponse;
        setQuestions(data.questions);
        setLoadedModule(data.module);
        setModuleTotal(data.moduleTotal);
        setIndex(0);
        setSelected("");
        setChecked(false);
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
    setModule(nextModule);
  }

  function nextQuestion() {
    setIndex((value) => (value + 1) % moduleQuestions.length);
    setSelected("");
    setChecked(false);
  }

  return (
    <section className="test-app" aria-labelledby="test-app-heading">
      <div className="test-app-head">
        <div>
          <p className="eyebrow">Test online</p>
          <h2 id="test-app-heading">Practica con preguntas reales de competencia profesional</h2>
          <p>
            Banco completo con {questionsData.total.toLocaleString("es-ES")} preguntas exportadas,
            organizadas por modulo y con comprobacion inmediata de respuesta.
          </p>
        </div>
        <div className="module-tabs" aria-label="Seleccionar modulo">
          {questionsData.modules.map((item) => (
            <button
              key={item}
              type="button"
              className={item === module ? "active" : ""}
              onClick={() => changeModule(item)}
            >
              Modulo {item}
            </button>
          ))}
        </div>
      </div>

      <article className="question-card" aria-busy={loading}>
        <div className="question-meta">
          <span>{question.code}</span>
          <span>{question.law}</span>
          <span>
            {loading
              ? "Cargando..."
              : `${Math.min(index + 1, visibleCount)} de ${moduleTotal || visibleCount}`}
          </span>
        </div>
        <h3>{question.prompt}</h3>
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
                  setChecked(false);
                }}
              >
                <strong>{option.key.toUpperCase()}</strong>
                <span>{option.text}</span>
              </button>
            );
          })}
        </div>
        <div className="test-actions">
          <button className="button primary" type="button" onClick={() => setChecked(true)}>
            Comprobar
          </button>
          <button className="button secondary" type="button" onClick={nextQuestion}>
            Siguiente pregunta
          </button>
          {checked ? (
            <p className="result">
              Respuesta correcta: <strong>{question.answer.toUpperCase()}</strong>
            </p>
          ) : null}
        </div>
      </article>
    </section>
  );
}
