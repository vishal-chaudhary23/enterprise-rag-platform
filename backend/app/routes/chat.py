from fastapi import APIRouter
from pydantic import BaseModel

from app.services.retriever import retrieve
from app.services.rag_chain import rag_chain


router = APIRouter()

class ChatRequest(BaseModel):
    question : str

@router.post("/chat")
def chat(query:ChatRequest):

    response = rag_chain.invoke(
        {
            "input": query.question
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