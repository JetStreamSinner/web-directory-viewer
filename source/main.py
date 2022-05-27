import os
import os.path as filesystem
from fastapi import FastAPI
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
import utils

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

current_path_cookie_key = "dir"


@application.get("/", response_class=HTMLResponse)
async def root(request: Request):
    if current_path_cookie_key not in request.cookies:
        current_path = os.getcwd()
    else:
        current_path = request.cookies.get(current_path_cookie_key)
    response = templates.TemplateResponse(name="index.html", context={
        "request": request
    })
    response.set_cookie(key=current_path_cookie_key, value=current_path)
    return response


@application.post("/dir", response_class=JSONResponse)
async def get_dir(request: Request):
    request_body = await request.json()

    target_path = request_body["target_directory"]
    target_path = utils.validate_path(target_path)

    current_path = request.cookies.get(current_path_cookie_key)
    target_path = utils.normalize_path(current_path, target_path)

    access_restricted = not utils.is_accessible(target_path)
    if access_restricted:
        error = utils.make_error_string(target_path)
        raise HTTPException(status_code=400, detail=error)

    directory_info = utils.make_dir_body(target_path)

    response_data = jsonable_encoder({
        "directory_info": directory_info
    })

    response = JSONResponse(content=response_data)
    response.set_cookie("dir", target_path)
    return response
