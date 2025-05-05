from common.models import Book
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["POST", "GET", "PUT", "DELETE"])
def sample(request):
    if request.method == "GET":
        book_id = request.query_params.get("book_id")
        book = Book.objects.filter(book_id=book_id).first()
        if book is None:

            return Response({"message": "GET no books"})

        response = {
            "book_id": book.book_id,
            "title": book.title,
            "author": book.author,
            "published_date": book.published_date,
        }
        return Response(response)

    elif request.method == "POST":
        title = request.data["title"]
        author = request.data["author"]
        published_date = request.data["published_date"]
        Book.objects.create(title=title, author=author, published_date=published_date)
        return Response({"message": "POST received"}, status=status.HTTP_201_CREATED)

    elif request.method == "PUT":
        book_id = request.data["book_id"]
        title = request.data["title"]
        author = request.data["author"]
        published_date = request.data["published_date"]
        book = Book.objects.filter(book_id=book_id).first()
        if book is None:
            return Response({"message": "PUT no Books"}, status=status.HTTP_200_OK)

        book.title = title
        book.author = author
        book.published_date = published_date
        book.save()
        return Response({"message": "PUT request received"}, status=status.HTTP_200_OK)

    elif request.method == "DELETE":
        book_id = request.query_params.get("book_id")
        book = Book.objects.filter(book_id=book_id).first()
        if book is None:
            return Response({"message": "DELETE no Books"}, status=status.HTTP_200_OK)
        book.delete()
        return Response(
            {"message": "DELETE request received"}, status=status.HTTP_204_NO_CONTENT
        )
