#!/usr/bin/env python3

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from pcpartpicker import API
import json
import nest_asyncio

nest_asyncio.apply()
# HTML_404_PAGE = "<h1>404 - Not found</h1>"


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
    #    exception_handlers=exceptions,
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = API()


@app.get('/api/parts')
async def cpu():
    return api.supported_parts


@app.get('/api/parts/{part}')
async def cpu(part: str):
    if part not in api.supported_parts:
        raise HTTPException(status_code=404, detail="Part not found")
    data = api.retrieve(part)
    data = json.loads(data.to_json())
    return data[part]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("index:app", host="127.0.0.1", port=8000, reload=True)
