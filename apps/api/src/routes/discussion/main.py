from fastapi import APIRouter
from . import get_discussions, create_discussion, delete_discussion, rename_discussion

router = APIRouter(prefix="/discussion", tags=["discussion"])

@router.get("/all")
async def all():
    return await get_discussions()

@router.post("/new")
async def new():
    return await create_discussion()

@router.delete("/delete")
async def delete():
    return await delete_discussion()

@router.put("/rename")
async def rename():
    return await rename_discussion()