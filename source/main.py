import os
import os.path as filesystem
from fastapi import FastAPI
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv

load_dotenv()

application = FastAPI()

static_dir = os.getenv("static_dir")

if not static_dir:
    default_static_dir = "../static"
    static_dir = default_static_dir

sub_application_static_dir = "/static"
internal_use_dir = "static"
application.mount(sub_application_static_dir, StaticFiles(directory=static_dir), internal_use_dir)

templates_dir = "templates"
templates = Jinja2Templates(directory=templates_dir)


@application.get("/", response_class=HTMLResponse)
def root(request: Request):
    current_dir_cookie_key = "dir"
    if current_dir_cookie_key not in request.cookies:
        current_directory = filesystem.abspath(os.getcwd())
    else:
        current_directory = request.cookies.get(current_dir_cookie_key)
    directory_items = ["..."]
    directory_items.extend(os.listdir())
    response = templates.TemplateResponse(name="index.html", context={
        "request": request,
        "directory_items": directory_items
    })
    response.set_cookie(key="dir", value=current_directory)
    return response
