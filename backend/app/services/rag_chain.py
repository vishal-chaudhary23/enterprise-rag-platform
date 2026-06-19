from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.prompts import ChatPromptTemplate
import os

from app.services.retriever import retriever

load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")


llm = ChatGroq(model = "llama-3.3-70b-versatile", groq_api_key= groq_api_key )


prompt = ChatPromptTemplate.from_template(
    """
    Answer the user's question using only the
    provided context.

    Conversation History:
    {history}

    Context:
    {context}

    Question:
    {input}

    If the answer is not present in the context,
    say you don't know.
    """
)

question_answer_chain = ( create_stuff_documents_chain(llm,prompt) )

rag_chain = create_retrieval_chain(
    retriever,
    question_answer_chain
)