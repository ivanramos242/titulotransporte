"use client";

import { useMemo, useState } from "react";
import questionsData from "@/data/questions-sample.json";

type Question = (typeof questionsData.questions)[number];

export function TestPractice() {
  const [module, setModule] = useState("1");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);

  const questions = useMemo(
    () => questionsData.questions.filter((question) => question.module === module),
    [module],
  );
  const question: Question = questions[index % questions.length] || questionsData.questions[0];

  function changeModule(nextModule: string) {
    setModule(nextModule);
    setIndex(0);
    setSelected("");
    setChecked(false);
  }

  function nextQuestion() {
    setIndex((value) => (value + 1) % questions.length);
    setSelected("");
    setChecked(false);
  }

  return (
    <section className="test-app" aria-labelledby="test-app-heading">
      <div className="test-app-head">
        <div>
          <p className="eyebrow">Motor de test migrado</p>
          <h2 id="test-app-heading">Practica con preguntas reales del WordPress original</h2>
          <p>
            Hay {questionsData.total.toLocaleString("es-ES")} preguntas exportadas. Esta primera
            versión carga una muestra funcional para validar formato, módulos, opciones y respuesta.
          </p>
        </div>
        <div className="module-tabs" aria-label="Seleccionar módulo">
          {questionsData.modules.map((item) => (
            <button
              key={item}
              type="button"
              className={item === module ? "active" : ""}
              onClick={() => changeModule(item)}
            >
              Módulo {item}
            </button>
          ))}
        </div>
      </div>

      <article className="question-card">
        <div className="question-meta">
          <span>{question.code}</span>
          <span>{question.law}</span>
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
