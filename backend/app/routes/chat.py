from fastapi import APIRouter
from pydantic import BaseModel

from app.services.retriever import retrieve
from app.services.rag_chain import rag_chain


router = APIRouter()

class ChatRequest(BaseModel):
    question : str
    history: list = []

@router.post("/chat")
def chat(query:ChatRequest):

    history_text = ""

    for msg in query.history:

        history_text += (
            f"{msg['role']}: "
            f"{msg['content']}\n"
        )

    response = rag_chain.invoke(
        {
            "input": query.question,
            "history": history_text
        }
    )

    sources = []

    for doc in response["context"]:
        sources.append({
            "page": doc.metadata.get("page"),
            "source": doc.metadata.get("source")
        })

    return {
        "answer": response["answer"],
        "sources": sources
    }