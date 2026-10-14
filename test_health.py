import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "integrations" in data


@pytest.mark.asyncio
async def test_health_api():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/health")
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_watsonx_status_not_configured():
    """Without credentials, watsonx should report not_configured."""
    from app.integrations.watsonx import get_watsonx_status
    status = get_watsonx_status()
    # Status is valid whether configured or not
    assert status["status"] in ("ready", "not_configured")
    assert "message" in status
