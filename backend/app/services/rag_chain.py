from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.prompts import ChatPromptTemplate
import os

from app.services.retriever import retriever
# from app.services.retriever import get_retriever


load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")


# llm = ChatGroq(model = "llama-3.3-70b-versatile", groq_api_key= groq_api_key , streaming = True)
llm = ChatGroq(model = "llama-3.3-70b-versatile", groq_api_key= groq_api_key)


prompt = ChatPromptTemplate.from_template(
    """
    You are a helpful assistant that answers
    questions using only the provided context.

    Conversation History:
    {history}

    Context:
    {context}

    Question:
    {input}

    Instructions:
    - Answer only using information found in the context.
    - If the context does not contain the answer,
      say: "I don't know based on the provided documents."
    - Do not make up facts or use outside knowledge.
    - If relevant, use the conversation history to
      understand references such as "previous question"
      or "that project".

    Answer:
    """
)

question_answer_chain = ( create_stuff_documents_chain(llm,prompt) )

rag_chain = create_retrieval_chain(
    retriever,
    question_answer_chain
)