from flask import Flask, render_template, request, url_for, redirect, make_response, session, g
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass

db = SQLAlchemy()

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text)
    description = db.Column(db.Text)
    category = db.Column(db.Text)
    status = db.Column(db.Text)
    start_date = db.Column(db.Text)
    updated_at = db.Column(db.Text)
    priority = db.Column(db.Integer)
    tags = db.Column(db.Text)
    progress = db.Column(db.Integer)
    picture_count = db.Column(db.Integer)
    link = db.Column(db.Text)

class Job(db.Model):
    __tablename__ = 'jobs'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text)
    company = db.Column(db.Text)
    location = db.Column(db.Text)
    start_date = db.Column(db.Text)
    end_date = db.Column(db.Text)
    description = db.Column(db.Text)

class Certificate(db.Model):
    __tablename__ = 'certificates'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text)
    issuer = db.Column(db.Text)
    issue_date = db.Column(db.Text)
    start_date = db.Column(db.Text)
    expiry_date = db.Column(db.Text)
    credential_link = db.Column(db.Text)
    credential_id = db.Column(db.Text)
    description = db.Column(db.Text)

class Education(db.Model):
    __tablename__ = 'education'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    institution = db.Column(db.Text)
    degree = db.Column(db.Text)
    field_of_study = db.Column(db.Text)
    start_date = db.Column(db.Text)
    end_date = db.Column(db.Text)
    description = db.Column(db.Text)

class Skill(db.Model):
    __tablename__ = 'skills'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text)
    category = db.Column(db.Text)
    proficiency = db.Column(db.Text)
    description = db.Column(db.Text)

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text)
    type = db.Column(db.Text)
    description = db.Column(db.Text)
    article = db.Column(db.Text)
    date = db.Column(db.Text)
    location = db.Column(db.Text)
    image_count = db.Column(db.Integer)
    company_or_charity = db.Column(db.Text)
    url = db.Column(db.Text)
    amount_raised = db.Column(db.Float)
    created_at = db.Column(db.Text)
    updated_at = db.Column(db.Text)
    is_published = db.Column(db.Integer)
    publisher = db.Column(db.Text)

class Social(db.Model):
    __tablename__ = 'socials'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    platform = db.Column(db.Text)
    svg = db.Column(db.Text)
    username = db.Column(db.Text)
    profile_url = db.Column(db.Text)
    description = db.Column(db.Text)
    created_at = db.Column(db.Text)
    is_active = db.Column(db.Integer)