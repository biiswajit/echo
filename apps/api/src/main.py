from fastapi import APIRouter
from .routes import chat_router, discussion_router

"""
API Endpoints:
GET /discussion/all(limit&offset)
PUT /discussion/rename??discussionId=
DELETE /discussion/delete??discussionId=
POST /discussion/new
GET /chat/all??discussionId=
POST /chat/init
POST /chat/new
"""

router = APIRouter()

router.include_router(chat_router)
router.include_router(discussion_router)