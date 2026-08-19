const grpc = require("@grpc/grpc-js");

const errorHandler = async (err, req, resp, next) => {
  if (err.code < 16) {
    console.log(err);
    switch (err.code) {
      case grpc.status.CANCELLED:
        return resp.status(499).json({ message: err.details || err.message });

      case grpc.status.UNKNOWN:
        return resp.status(500).json({ message: err.details || err.message });

      case grpc.status.INVALID_ARGUMENT:
        return resp.status(400).json({ message: err.details || err.message });

      case grpc.status.DEADLINE_EXCEEDED:
        return resp.status(408).json({ message: err.details || err.message });

      case grpc.status.NOT_FOUND:
        return resp.status(404).json({ message: err.details || err.message });

      case grpc.status.ALREADY_EXISTS:
        return resp.status(409).json({ message: err.details || err.message });

      case grpc.status.PERMISSION_DENIED:
        return resp.status(403).json({ message: err.details || err.message });

      case grpc.status.RESOURCE_EXHAUSTED:
        return resp.status(507).json({ message: err.details || err.message });

      case grpc.status.FAILED_PRECONDITION:
        return resp.status(500).json({ message: err.details || err.message });

      case grpc.status.ABORTED:
        return resp.status(409).json({ message: err.details || err.message });

      case grpc.status.OUT_OF_RANGE:
        return resp.status(500).json({ message: err.details || err.message });

      case grpc.status.UNIMPLEMENTED:
        return resp.status(405).json({ message: err.details || err.message });

      case grpc.status.INTERNAL:
        return resp.status(500).json({ message: err.details || err.message });

      case grpc.status.UNAVAILABLE:
        return resp.status(503).json({ message: err.details || err.message });

      case grpc.status.DATA_LOSS:
        return resp.status(500).json({ message: err.details || err.message });

      case grpc.status.UNAUTHENTICATED:
        return resp.status(401).json({ message: err.details || err.message });

      default:
        return resp.status(500).json({ message: "unknown grpc error" });
    }
  } else {
    console.log(err);
    const status = err.code || 500;
    const message = err.message || "Internal server error";
    const extraDetails = err.extraDetails || "Internal server error";

    return resp.status(status).json({ message, extraDetails });
  }
};

module.exports = { errorHandler };
