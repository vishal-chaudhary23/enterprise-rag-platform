from app.services.retriever import retrieve

query = "What is this document about?"

results = retrieve(query)

for i, doc in enumerate(results):
    print(f"\nResult {i+1}")
    print("-" * 50)
    print(doc.page_content[:300])
    print(doc.metadata)