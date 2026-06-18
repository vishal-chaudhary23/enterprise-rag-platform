from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="all-MiniLM-L6-v2"
)

# existing chromadb
vectorstore = Chroma(
    persist_directory="data/chroma",
    embedding_function=embeddings
)

retriever = vectorstore.as_retriever()

def retrieve(query):
    return retriever.invoke(query)

def get_vector_store():
    return vectorstore