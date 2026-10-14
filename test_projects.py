import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
async def test_create_project():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/v1/projects", json={"name": "Test Project", "description": "A test"})
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Project"
    assert "id" in data
    assert data["paper_count"] == 0


@pytest.mark.asyncio
async def test_list_projects():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/projects")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.asyncio
async def test_create_and_get_project():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        create_resp = await ac.post("/api/v1/projects", json={"name": "Get Test Project"})
        assert create_resp.status_code == 201
        pid = create_resp.json()["id"]
        get_resp = await ac.get(f"/api/v1/projects/{pid}")
    assert get_resp.status_code == 200
    assert get_resp.json()["id"] == pid


@pytest.mark.asyncio
async def test_update_project():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        create_resp = await ac.post("/api/v1/projects", json={"name": "Update Me"})
        pid = create_resp.json()["id"]
        update_resp = await ac.patch(f"/api/v1/projects/{pid}", json={"name": "Updated Name"})
    assert update_resp.status_code == 200
    assert update_resp.json()["name"] == "Updated Name"


@pytest.mark.asyncio
async def test_delete_project():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        create_resp = await ac.post("/api/v1/projects", json={"name": "Delete Me"})
        pid = create_resp.json()["id"]
        del_resp = await ac.delete(f"/api/v1/projects/{pid}")
    assert del_resp.status_code == 204


@pytest.mark.asyncio
async def test_create_project_empty_name():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/v1/projects", json={"name": ""})
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_get_nonexistent_project():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/projects/nonexistent-id-xyz")
    assert response.status_code == 404
