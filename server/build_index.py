#!/usr/bin/env python3
"""
Bajaj Finserv AI Assistant - Index Builder
This script creates a vector index from PDF/text documents for offline querying
"""

import os
import sys
from pathlib import Path

try:
    from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, Settings
    from llama_index.core.storage.storage_context import StorageContext
    from llama_index.embeddings.huggingface import HuggingFaceEmbedding
    from llama_index.llms.ollama import Ollama
    print("✅ LlamaIndex imports successful")
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("Please install required packages:")
    print("pip install llama-index llama-index-llms-ollama llama-index-embeddings-huggingface")
    sys.exit(1)

def setup_llm_and_embeddings():
    """Configure LLM and embedding models"""
    try:
        # Configure Ollama LLM
        llm = Ollama(model="mistral", request_timeout=120.0)
        
        # Configure HuggingFace embeddings (smaller, faster model)
        embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")
        
        # Set global settings
        Settings.llm = llm
        Settings.embed_model = embed_model
        Settings.chunk_size = 512
        Settings.chunk_overlap = 50
        
        print("✅ LLM and embeddings configured successfully")
        return True
    except Exception as e:
        print(f"❌ Error configuring models: {e}")
        return False

def build_index():
    """Build vector index from documents"""
    try:
        # Set up paths
        transcripts_dir = "./transcripts"
        storage_dir = "./storage"
        
        # Check if transcripts directory exists
        if not os.path.exists(transcripts_dir):
            print(f"❌ Transcripts directory not found: {transcripts_dir}")
            return False
            
        # Load documents
        print(f"📂 Loading documents from {transcripts_dir}...")
        documents = SimpleDirectoryReader(transcripts_dir).load_data()
        
        if not documents:
            print("❌ No documents found in transcripts directory")
            return False
            
        print(f"✅ Loaded {len(documents)} documents")
        
        # Create index
        print("🔄 Creating vector index...")
        index = VectorStoreIndex.from_documents(documents, show_progress=True)
        
        # Save index
        print(f"💾 Saving index to {storage_dir}...")
        index.storage_context.persist(persist_dir=storage_dir)
        
        print("✅ Index created and saved successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error building index: {e}")
        return False

def main():
    """Main function"""
    print("🚀 Bajaj Finserv AI Assistant - Index Builder")
    print("=" * 50)
    
    # Setup models
    if not setup_llm_and_embeddings():
        sys.exit(1)
    
    # Build index
    if not build_index():
        sys.exit(1)
        
    print("\n🎉 Index building completed successfully!")
    print("You can now run query_llm.py to ask questions about the earnings transcripts.")

if __name__ == "__main__":
    main()
