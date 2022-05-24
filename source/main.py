from fastapi import FastAPI


application = FastAPI()


@application.get("/")
def root():
    return "Root"
