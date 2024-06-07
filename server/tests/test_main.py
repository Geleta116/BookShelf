from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app=app)


def test_create_book():

    response = client.post("/books", json={"title": "Sample Book"})

    assert response.status_code == 201
    assert response.json()["title"] == "Sample Book"


def test_get_book_by_id():

    create_response = client.post("/books", json={"title": "Sample Book"})
    book_id = create_response.json()["id"]
    response = client.get(f"/books/{book_id}")

    assert response.status_code == 200
    assert response.json()["title"] == "Sample Book"


def test_delete_book():

    create_response = client.post("/books", json={"title": "Sample Book"})
    book_id = create_response.json()["id"]
    delete_response = client.delete(f"/books/{book_id}")

    assert delete_response.status_code == 204

def test_update_book_status():
    
    create_response = client.post("/books", json={"title": "Sample Book two"})
    book_id = create_response.json()["id"]
    update_response = client.put(f"/books/{book_id}", json={"status": "completed"})
    
    assert update_response.status_code == 200
