import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
async def test_upload_invalid_extension():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        proj = await ac.post("/api/v1/projects", json={"name": "Doc Test Project"})
        pid = proj.json()["id"]
        response = await ac.post(
            "/api/v1/documents/upload",
            data={"project_id": pid},
            files={"file": ("test.exe", b"fake content", "application/octet-stream")},
        )
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_list_documents_empty():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        proj = await ac.post("/api/v1/projects", json={"name": "Empty Doc Project"})
        pid = proj.json()["id"]
        response = await ac.get(f"/api/v1/documents/project/{pid}")
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.asyncio
async def test_get_nonexistent_document():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/documents/nonexistent-doc-id")
    assert response.status_code == 404
