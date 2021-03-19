class BaseError extends Error {
  constructor(details) {
    const messages = JSON.stringify(details);
    //const messages = details?.map((e) => e.description_detail).flat();
    super(messages);
  }
}

export class GenericError extends BaseError {
  constructor(details) {
    super(details);
  }

  get httpStatus() {
    return 500;
  }
}

export class InvalidRequest extends BaseError {
  constructor(details) {
    super(details);
  }

  get httpStatus() {
    return 400;
  }
}

export class UnauthorizedError extends BaseError {
  constructor(details) {
    super(details);
  }

  get httpStatus() {
    return 401;
  }
}

export class NotFoundError extends BaseError {
  constructor(details) {
    super(details);
  }

  get httpStatus() {
    return 404;
  }
}

export class PaymentDeniedError extends BaseError {
  constructor(details) {
    super(details);
  }

  get httpStatus() {
    return 402;
  }
}

export const handleError = (response) => {
  //  return new Error(JSON.stringify(response));

  if (response.data?.details) {
    switch (response.status) {
      case 400:
        return new InvalidRequest(response.data.details);
      case 401:
        return new UnauthorizedError(response.data.details);
      case 402:
        return new PaymentDeniedError(response.data.details);
      case 404:
        return new NotFoundError(response.data.details);
      default:
        return new GenericError(response.data.details);
    }
  } else {
    return new Error(JSON.stringify(response));
  }
};
