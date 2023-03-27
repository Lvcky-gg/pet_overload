from flask import jsonify


def bad_request(message: str) -> tuple:
    '''
    Returns a 400 Bad Request response with the provided message
    '''
    response = jsonify({'message': message})
    response.status_code = 400
    return response


def forbidden(message: str) -> tuple:
    '''
    Returns a 403 Forbidden response with the provided message
    '''
    response = jsonify({'message': message})
    response.status_code = 403
    return response


def not_found(message: str) -> tuple:
    '''
    Returns a 404 Not Found response with the provided message
    '''
    response = jsonify({'message': message})
    response.status_code = 404
    return response


def success(message: str) -> tuple:
    '''
    Returns a 200 OK response with the provided message
    '''
    response = jsonify({'message': message})
    response.status_code = 200
    return response
