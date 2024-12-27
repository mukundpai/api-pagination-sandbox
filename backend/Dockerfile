FROM python:3.12-slim-bookworm
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/


# Set working directory
ENV DIRECTORY=/app
WORKDIR ${DIRECTORY}

# Set python environment
ENV PATH="${DIRECTORY}/.venv/bin:$PATH"

# Copy files to container
COPY app.py pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen

# Expose port
EXPOSE 5000

# Run the server
CMD ["python", "./app.py"]

