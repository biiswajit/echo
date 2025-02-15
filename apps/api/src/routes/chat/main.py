from fastapi import APIRouter
from . import get_chats, init_chat, create_chat

router = APIRouter(prefix="/chat", tags=["chat"])

@router.get("/all")
async def all():
    return await get_chats()

@router.post("/init")
async def init():
    return await init_chat()

@router.post("/new")
async def new():
    return await create_chat()