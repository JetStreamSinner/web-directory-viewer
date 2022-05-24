import os
from fastapi import FastAPI
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv

load_dotenv()

application = FastAPI()

templates_dir = "templates"
templates = Jinja2Templates(directory=templates_dir)


@application.get("/", response_class=HTMLResponse)
def root(request: Request):
    return templates.TemplateResponse(name="index.html", context={
        "request": request
    })
