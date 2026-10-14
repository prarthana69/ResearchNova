import pytest
import asyncio
import os

# Use an in-memory test database
os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///:memory:"
os.environ["UPLOAD_DIR"] = "./test_uploads"


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session", autouse=True)
async def setup_db():
    """Initialize the test database once for the entire test session."""
    from app.db.session import init_db
    import os
    os.makedirs("./test_uploads", exist_ok=True)
    await init_db()
