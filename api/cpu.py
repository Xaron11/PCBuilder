from fastapi import FastAPI

app = FastAPI(
    title="Vercel FastAPI",
    description="Vercel FastAPI",
    version="0.1.0",
    docs_url='/api',
    openapi_url='/api/openapi.json',
    redoc_url=None,
)


@app.get('/api/hello')
async def hello():
    return {'message': 'Hello world!'}
