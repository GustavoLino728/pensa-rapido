"use client";

import { useState } from "react";
import Header from "@/components/Header";
import GameBoard from "@/components/GameBoard";
import WordInput from "@/components/WordInput";

type LetterState = "available" | "selected" | "used";

interface Letter {
  char: string;
  state: LetterState;
}

interface WordApiResponse {
  word: string;
  deletor: string | null;
  revision_id: number;
  moderator: string | null;
  xml: string;
  deleted: number;
  last_revision: number;
  sense: number;
  creator: string;
  timestamp: string;
  normalized: string;
  derived_from: string | null;
  word_id: number;
}

type ValidationResult = {
  isValidStart: boolean;
  isRealWord: boolean | null;
  message: string;
  apiResponse?: WordApiResponse[];
}

const initialLetters: Letter[] = "ABCDEFGHIJLMNOPRSTUV"
  .split("")
  .map((char) => ({ char, state: "available" }));

export default function Game() {
  const [letters, setLetters] = useState<Letter[]>(initialLetters);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set());
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const handleLetterClick = (index: number) => {
    setLetters((prev) =>
      prev.map((l, i) => {
        if (l.state === "used") return l;
        
        if (i === index) {
          const newState = l.state === "selected" ? "available" : "selected";
          setSelectedLetter(newState === "selected" ? l.char : null);
          return { ...l, state: newState };
        } else {
          if (l.state === "selected") {
            return { ...l, state: "available" };
          }
          return l;
        }
      })
    );
  };

  const handleWordSuccess = (word: string) => {
    setUsedWords(prevSet => {
      const newSet = new Set(prevSet);
      newSet.add(word);
      return newSet;
    });
    
    // Desativa letra
    setLetters(prev =>
      prev.map(l => 
        l.char === selectedLetter 
          ? { ...l, state: "used" }
          : l
      )
    );
    
    // Limpa para próxima palavra
    setSelectedLetter(null);
    setCurrentWord("");
    setValidationResult(null);
  }; // <- Fechamento CORRETO da função

  const handleValidateWord = async () => {
    const normalizedWord = currentWord.trim().toLowerCase();
    
    // Guard 1: Palavra vazia
    if (!normalizedWord) {
      setValidationResult({
        isValidStart: false,
        isRealWord: false,
        message: "Digite uma palavra"
      });
      return;
    }

    // Guard 2: Nenhuma letra selecionada
    if (!selectedLetter) {
      setValidationResult({
        isValidStart: false,
        isRealWord: false,
        message: "Selecione uma letra primeiro"
      });
      return;
    }

    // Guard 3: Palavra já usada
    if (usedWords.has(normalizedWord)) {
      setValidationResult({
        isValidStart: true,
        isRealWord: false,
        message: "🔄 Esta palavra já foi usada!"
      });
      return;
    }

    setIsValidating(true);
    
    try {
      // Validação: Começa com letra selecionada
      const startsCorrect = normalizedWord.toUpperCase().startsWith(selectedLetter);
      
      if (!startsCorrect) {
        setValidationResult({
          isValidStart: false,
          isRealWord: false,
          message: `Palavra deve começar com "${selectedLetter}"`
        });
        return;
      }

      // Validação: Palavra real
      const isRealWord = await validateWordInDictionary(normalizedWord);
      
      setValidationResult({
        isValidStart: true,
        isRealWord,
        message: isRealWord 
          ? "✅ Palavra válida!" 
          : "❌ Palavra não encontrada no dicionário"
      });

      // Se palavra válida, processar sucesso
      if (isRealWord) {
        handleWordSuccess(normalizedWord);
      }

    } catch (error) {
      setValidationResult({
        isValidStart: true,
        isRealWord: false,
        message: "🔌 Erro de conexão. Tente novamente."
      });
    } finally {
      setIsValidating(false);
    }
  };

  const validateWordInDictionary = async (word: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://api.dicionario-aberto.net/word/${word.toLowerCase()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data: WordApiResponse[] = await response.json();
      
      return data.length > 0;
      
    } catch (error) {
      console.error('Erro ao validar palavra:', error);
      throw error; 
    }
  };

  return (
    <div className="bg-blue-100">
      <Header></Header>
      <GameBoard 
        letters={letters} 
        onLetterClick={handleLetterClick} 
      />
      
      <WordInput
        word={currentWord}
        onWordChange={setCurrentWord}
        onValidate={handleValidateWord}
        isValidating={isValidating}
        validationResult={validationResult}
        selectedLetter={selectedLetter}
      />
    </div>
  );
}