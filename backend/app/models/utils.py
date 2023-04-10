from flask import jsonify
from werkzeug import Response


class BaseException(Exception):
    """
    Base exception class that handles status codes and messages
    """

    def __init__(self, message: str, status_code: int) -> None:
        self.message = message
        self.status_code = status_code

        super().__init__(message)


class ValidationException(BaseException):
    """
    Exception raised by the model for validation errors
    """

    def __init__(self, message: str) -> None:
        super().__init__(message, 400)


class NotFoundException(BaseException):
    """
    Exception raised by the model for not found errors
    """

    def __init__(self, message: str) -> None:
        super().__init__(message, 404)


class ForbiddenException(BaseException):
    """
    Exception raised by the model for forbidden errors
    """

    def __init__(self, message: str) -> None:
        super().__init__(message, 403)


class UnauthorizedException(BaseException):
    """
    Exception raised by the model for unauthorized errors
    """

    def __init__(self, message: str) -> None:
        super().__init__(message, 401)


def handle_error(exception: BaseException) -> Response:
    """
    Handles the exceptions and returns a JSON response
    """
    response = jsonify({"error": exception.message})
    response.status_code = exception.status_code

    return response
