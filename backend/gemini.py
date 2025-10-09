import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY não encontrada. Adicione ao arquivo .env")

genai.configure(api_key=api_key)

def chat_with_gemini(word:str, theme:str) -> str:
    """
    Envia a pergunta para o modelo Gemini e retorna a response.
    """
    question = (
        f"Você é um avaliador rigoroso de palavras para jogos temáticos.\n"
        f"Verifique se a palavra '{word}' é uma palavra válida de um dicionário reconhecido.\n"
        f"Em seguida, confirme se essa palavra está diretamente relacionada ao tema '{theme}',\n"
        f"considerando apenas palavras que fazem parte do campo semântico específico do tema.\n"
        f"Responda apenas com um código numérico, sem explicações, seguindo esta regra:\n"
        f"404 = A palavra não existe no dicionário.\n"
        f"200 = A palavra existe no dicionário, mas não está relacionada ao tema '{theme}'.\n"
        f"400 = A palavra existe no dicionário e está relacionada ao tema '{theme}'.\n"
        f"Considere sinônimos e termos diretamente utilizados dentro do tema para validar a relação."
    )
    model = genai.GenerativeModel("gemini-2.5-flash")  # Modelo leve e rápido
    response = model.generate_content(question)
    return response.text

if __name__ == "__main__":
    print("Chat com Gemini (digite 'sair' para encerrar)")
    while True:
        try:
            response = chat_with_gemini()
            print("Gemini:", response)
            break
        except Exception as e:
            print("Erro:", e)