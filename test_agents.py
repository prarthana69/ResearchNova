import pytest
from app.agents.gap_analysis_agent import GapAnalysisRequest, run as gap_run
from app.agents.trend_analysis_agent import TrendRequest, run as trend_run
from app.agents.knowledge_graph_agent import GraphRequest, run as graph_run
from app.agents.roadmap_agent import RoadmapRequest, run as roadmap_run
from app.agents.discovery_agent import DiscoveryRequest, run as discovery_run

SAMPLE_PAPERS = [
    {
        "id": "p1",
        "title": "Deep Learning for Natural Language Processing",
        "authors": ["Alice Smith", "Bob Jones"],
        "year": 2022,
        "abstract": (
            "This paper presents a deep learning approach for NLP. "
            "However, the method has limited performance on low-resource languages "
            "and future work should address this limitation."
        ),
        "doi": "10.1234/test1",
        "source": "arxiv",
    },
    {
        "id": "p2",
        "title": "Transformer Models in Machine Learning",
        "authors": ["Carol White"],
        "year": 2023,
        "abstract": (
            "We survey transformer models for machine learning tasks. "
            "The lack of interpretability remains a key challenge. "
            "Missing comparison with classical methods is a limitation."
        ),
        "doi": "10.1234/test2",
        "source": "openalex",
    },
]


@pytest.mark.asyncio
async def test_gap_analysis_returns_gaps():
    req = GapAnalysisRequest(papers=SAMPLE_PAPERS)
    result = await gap_run(req)
    assert result.gaps
    assert result.generated_by in ("local_heuristic", "watsonx")
    for gap in result.gaps:
        assert "statement" in gap
        assert "gap_type" in gap
        assert "confidence_level" in gap


@pytest.mark.asyncio
async def test_gap_analysis_empty_papers():
    req = GapAnalysisRequest(papers=[])
    result = await gap_run(req)
    # Should return at least one gap explaining insufficient data
    assert result.gaps


def test_trend_analysis_returns_structure():
    req = TrendRequest(papers=SAMPLE_PAPERS)
    result = trend_run(req)
    assert isinstance(result.topics, list)
    assert isinstance(result.yearly_counts, list)
    assert isinstance(result.emerging_keywords, list)
    assert isinstance(result.declining_keywords, list)
    assert isinstance(result.topic_relationships, list)


def test_trend_analysis_yearly_counts():
    req = TrendRequest(papers=SAMPLE_PAPERS)
    result = trend_run(req)
    # yearly_counts are dicts with 'year' key
    years = [yc["year"] for yc in result.yearly_counts]
    assert 2022 in years
    assert 2023 in years


def test_knowledge_graph_nodes_and_edges():
    req = GraphRequest(papers=SAMPLE_PAPERS, project_id="test-project")
    result = graph_run(req)
    assert isinstance(result.nodes, list)
    assert isinstance(result.edges, list)
    paper_nodes = [n for n in result.nodes if n["type"] == "paper"]
    assert len(paper_nodes) >= 1


def test_knowledge_graph_node_structure():
    req = GraphRequest(papers=SAMPLE_PAPERS, project_id="test-project")
    result = graph_run(req)
    for node in result.nodes:
        assert "id" in node
        assert "label" in node
        assert "type" in node
    for edge in result.edges:
        assert "source" in edge
        assert "target" in edge
        assert "relationship" in edge


@pytest.mark.asyncio
async def test_roadmap_local_fallback():
    req = RoadmapRequest(
        gap_statement="Deep learning models lack interpretability in NLP tasks",
        context_papers=SAMPLE_PAPERS,
        project_id="test-project",
    )
    result = await roadmap_run(req)
    assert result.title
    assert result.research_question
    assert result.objectives
    assert result.implementation_plan
    assert result.generated_by in ("local_template", "watsonx")


@pytest.mark.asyncio
async def test_discovery_agent_no_sources():
    req = DiscoveryRequest(query="machine learning", sources=[], limit=5)
    result = await discovery_run(req)
    assert result.papers == []
    assert result.total == 0
    assert result.sources_searched == []
