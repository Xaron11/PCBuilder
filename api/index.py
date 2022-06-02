#!/usr/bin/env python3

from fastapi import FastAPI

# HTML_404_PAGE = "<h1>404</h1>"


# async def not_found(request, exc):
#    return HTMLResponse(content=HTML_404_PAGE, status_code=exc.status_code)


# exceptions = {
#    404: not_found,
# }

app = FastAPI(
    title="Vercel FastAPI",
    description="Vercel FastAPI",
    version="0.1.0",
    docs_url='/api',
    openapi_url='/api/openapi.json',
    redoc_url=None,
    # exception_handlers=exceptions,
)


@app.get('/')
async def root():
    return {'message': 'root!'}


@app.get('/api')
async def api():
    return {'message': 'api root!'}


@app.get('/api/index')
async def index():
    return {'message': 'index!'}


@app.get('/api/hello')
async def hello():
    return {'message': 'hello!'}
