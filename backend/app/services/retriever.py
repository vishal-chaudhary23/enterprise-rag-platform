from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from app.services.embeddings import embeddings

# embeddings = HuggingFaceEmbeddings(
#     model_name="all-MiniLM-L6-v2"
# )

# existing chromadb
vectorstore = Chroma(
    persist_directory="data/chroma",
    embedding_function=embeddings
)
# def get_vector_store():
#     vectorstore = Chroma(
#         persist_directory="data/chroma",
#         embedding_function=embeddings
#     )
#     # return vectorstore.as_retriever()

# retriever = get_vector_store().as_retriever()

# def retrieve(query):
#     retriever = retriever
#     return retriever.invoke(query)

retriever = vectorstore.as_retriever()

def retrieve(query):
    return retriever.invoke(query)

def get_vector_store():
    return vectorstore