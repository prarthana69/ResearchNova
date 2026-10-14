# ResearchNova AI — Intelligent Research Co-Pilot

**From scattered papers to breakthrough ideas.**

ResearchNova AI is an end-to-end AI-powered research platform that helps researchers, students, and professionals:

- **Discover** academic papers from OpenAlex, arXiv, and Crossref
- **Upload and analyze** PDFs with text extraction and intelligent retrieval
- **Chat** with research papers using evidence-grounded Q&A with citations
- **Generate** structured literature reviews with comparison matrices
- **Identify** research gaps, limitations, and unresolved questions
- **Analyze** topic trends, emerging keywords, and publication timelines
- **Visualize** knowledge graphs and citation networks
- **Create** research roadmaps from gaps to implementation plans

---

## Architecture

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4
- **Backend:** Python FastAPI + SQLAlchemy + SQLite
- **AI:** IBM watsonx.ai (Granite models) + RAG pipeline
- **Retrieval:** BM25 lexical search (always available locally)
- **Data Sources:** OpenAlex, arXiv, Crossref (no API keys required)

---

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **IBM watsonx.ai credentials** (optional, but required for AI features)

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your IBM watsonx.ai credentials (optional)
```

**Run backend:**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at **http://localhost:8000**

API docs: **http://localhost:8000/docs**

### 2. Frontend Setup

```bash
cd frontend
npm install
```

**Run frontend:**
```bash
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## Configuration

### IBM watsonx.ai (Optional but Recommended)

ResearchNova AI works without IBM watsonx.ai, but **AI-powered features require credentials**:

- **AI Literature Review Synthesis**
- **AI Research Chat**
- **AI Research Gap Analysis**
- **AI Roadmap Generation**

**Without IBM watsonx.ai**, the app still provides:
- Paper discovery (OpenAlex, arXiv, Crossref)
- PDF upload and text extraction
- Evidence retrieval (BM25)
- Keyword-based gap detection
- Trend analysis
- Knowledge graph generation

**To enable AI features:**

1. Get credentials from [IBM watsonx.ai](https://dataplatform.cloud.ibm.com/wx/home)
2. Edit `backend/.env`:

```bash
IBM_WATSONX_API_KEY=your-api-key
IBM_WATSONX_PROJECT_ID=your-project-id
IBM_WATSONX_URL=https://us-south.ml.cloud.ibm.com
IBM_WATSONX_MODEL_ID=ibm/granite-13b-chat-v2
```

3. Restart backend

---

## Project Structure

```
researchnova-ai/
├── backend/
│   ├── app/
│   │   ├── agents/             # 8 modular research agents
│   │   ├── api/endpoints/      # FastAPI routes
│   │   ├── core/              # Config and settings
│   │   ├── db/                # Database session
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Document & retrieval services
│   │   ├── integrations/      # IBM watsonx, OpenAlex, arXiv, Crossref
│   │   └── main.py
│   ├── tests/                 # Pytest suite
│   ├── requirements.txt
│   ├── .env.example
│   └── pytest.ini
└── frontend/
    ├── src/
    │   ├── components/        # Reusable UI components
    │   ├── lib/               # API client
    │   ├── pages/             # 12 application screens
    │   ├── store/             # Zustand state
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

---

## Features

### ✅ Available Without AI

| Feature | Description |
|---------|-------------|
| **Paper Discovery** | Search OpenAlex (200M+ papers), arXiv, Crossref |
| **PDF Upload & Processing** | Extract text, chunk, index for retrieval |
| **Document Management** | Upload, list, delete, track processing status |
| **Evidence Retrieval** | BM25 keyword-based retrieval (local) |
| **Research Projects** | Create, manage, organize papers and documents |
| **Trend Analysis** | Keyword frequency, yearly publication counts |
| **Knowledge Graph** | Extract methods, topics, datasets from papers |
| **Citation Network** | Semantic similarity graph |

### 🤖 Requires IBM watsonx.ai

| Feature | Description |
|---------|-------------|
| **AI Research Chat** | Evidence-grounded Q&A with inline citations |
| **AI Literature Review** | Structured synthesis with comparison matrix |
| **AI Gap Analysis** | Deep analysis of limitations and opportunities |
| **AI Roadmap Generation** | Convert gaps into research plans |

---

## Backend API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check + integration status |
| `/api/v1/projects` | GET/POST | List or create projects |
| `/api/v1/projects/{id}` | GET/PATCH/DELETE | Get, update, delete project |
| `/api/v1/papers/search` | POST | Search OpenAlex, arXiv, Crossref |
| `/api/v1/papers/save` | POST | Save paper to project |
| `/api/v1/documents/upload` | POST | Upload PDF or text file |
| `/api/v1/documents/chat` | POST | Ask research questions |
| `/api/v1/research/literature-review` | POST | Generate literature review |
| `/api/v1/research/gap-analysis` | POST | Analyze research gaps |
| `/api/v1/research/trends` | POST | Analyze trends |
| `/api/v1/research/roadmap` | POST | Generate research roadmap |
| `/api/v1/graphs/knowledge/{project_id}` | GET | Get knowledge graph |
| `/api/v1/graphs/citation/{project_id}` | GET | Get citation network |

---

## Running Tests

### Backend Tests

```bash
cd backend
pytest
```

**Tests cover:**
- Health checks
- Project CRUD
- Document upload validation
- Agent functionality (local fallbacks)
- Integration status detection

### Frontend Build

```bash
cd frontend
npm run build
```

---

## Deployment Notes

### Environment Variables (backend/.env)

```bash
# IBM watsonx.ai (optional)
IBM_WATSONX_API_KEY=
IBM_WATSONX_PROJECT_ID=
IBM_WATSONX_URL=https://us-south.ml.cloud.ibm.com
IBM_WATSONX_MODEL_ID=ibm/granite-13b-chat-v2

# Database
DATABASE_URL=sqlite+aiosqlite:///./researchnova.db

# App
SECRET_KEY=change-this-in-production-to-a-random-64-char-string
DEBUG=true
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# File upload
MAX_UPLOAD_SIZE_MB=50
UPLOAD_DIR=./uploads

# External APIs
OPENALEX_EMAIL=your-email@example.com
```

### Production Checklist

- [ ] Set `DEBUG=false`
- [ ] Use a random, secure `SECRET_KEY`
- [ ] Use PostgreSQL instead of SQLite for production
- [ ] Configure proper `ALLOWED_ORIGINS`
- [ ] Set up file storage (S3, etc.) instead of local `./uploads`
- [ ] Add rate limiting
- [ ] Set up HTTPS
- [ ] Configure logging and monitoring
- [ ] Run with `gunicorn` or similar ASGI server

---

## Known Limitations

1. **Scholarly Data Accuracy:**  
   Paper search results depend on OpenAlex, arXiv, and Crossref availability and data quality.

2. **Citation Verification:**  
   Citation networks shown are based on semantic similarity (shared keywords), not verified citation links. Use Crossref citation APIs for verified citation data.

3. **Research Gap Novelty:**  
   Gaps are identified from **selected papers only**. Cannot claim global novelty without comprehensive literature review.

4. **AI Generation Verification:**  
   All AI-generated content (reviews, gaps, roadmaps) must be verified by human researchers before use.

5. **PDF Processing:**  
   Text extraction works best for text-based PDFs. Scanned/image-based PDFs require OCR (not included).

6. **Scalability:**  
   SQLite is suitable for development. Use PostgreSQL for production.

---

## Troubleshooting

### Backend won't start

- Check Python version: `python --version` (needs 3.11+)
- Install requirements: `pip install -r requirements.txt`
- Check `.env` file exists
- Ensure port 8000 is not in use

### Frontend won't start

- Check Node version: `node --version` (needs 18+)
- Install dependencies: `npm install`
- Ensure backend is running at http://localhost:8000

### AI features not working

- Check `Settings` page for integration status
- Verify IBM watsonx.ai credentials in `backend/.env`
- Restart backend after changing `.env`
- Check backend logs for error messages

### PDF upload fails

- Check file extension (only `.pdf`, `.txt`, `.md`)
- Check file size (max 50 MB by default)
- Verify `UPLOAD_DIR` has write permissions
- Check backend logs for processing errors

### No papers found in search

- Check internet connection
- OpenAlex, arXiv, Crossref may be temporarily unavailable
- Try broader search terms
- Check backend logs for API errors

---

## License

This project is provided as-is for educational and research purposes.

---

## Acknowledgments

- **IBM watsonx.ai** for foundation model capabilities
- **OpenAlex** for open scholarly metadata
- **arXiv** for preprint access
- **Crossref** for DOI registry

---

**Built with ❤️ for researchers, by researchers.**

For issues, suggestions, or contributions, please open an issue or PR.
