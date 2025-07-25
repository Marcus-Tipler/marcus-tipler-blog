# ----------------------------------------------------------
# Importing all required libraries for this Project.
# ----------------------------------------------------------
from flask import Flask, Blueprint, render_template, request, url_for, redirect, make_response, session, g
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass
from context.databaseHandler import db, Project, Job, Certificate, Education, Skill, Event, Social, ProjectCategory
import os

# ----------------------------------------------------------
# Doing initial setup for certain aspects of the project.
# ----------------------------------------------------------
dir_path = os.path.dirname(os.path.realpath(__file__))
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mft-db.sqlite3'
db.init_app(app)
CODERSRANK_USERNAME = "marcus-tipler"

with app.app_context():
    db.create_all()

@app.context_processor
def inject_menu():
    menu = Social.query.all()
    return dict(menu=menu)


# ----------------------------------------------------------
# Root initializations for the Project.
# ----------------------------------------------------------
# -- TEMPLATE PAGES --
@app.route('/')
def indexPage():
    return render_template('index.html')

@app.route('/about')
def aboutPage():
    jobs = Job.query.order_by(Job.id.desc()).limit(9).all()
    education = Education.query.order_by(Education.id.desc()).limit(3).all()
    return render_template('about.html', jobs=jobs, education=education)

@app.route('/projects')
def projectsPage():
    projects = []
    menu_item = ProjectCategory.query.all()
    categories = ProjectCategory.query.all()
    selected_category = None
    projects_count = len(projects)
    categories_count = len(categories)
    return render_template(
        'projects.html',
        projects=projects,
        categories=categories,
        menu_item=menu_item,
        projects_count=projects_count,
        categories_count=categories_count,
        selected_category=selected_category
    )

@app.route('/projects/category/<int:category_id>')
def projectsByCategory(category_id):
    categories = []
    menu_item = ProjectCategory.query.all()
    projects = Project.query.filter_by(category_id=category_id).all()
    selected_category = ProjectCategory.query.get_or_404(category_id)
    projects_count = len(projects)
    categories_count = len(categories)
    return render_template(
        'projects.html',
        projects=projects,
        categories=categories,
        menu_item=menu_item,
        projects_count=projects_count,
        categories_count=categories_count,
        selected_category=selected_category
    )

@app.route('/projects/search')
def projectsSearch():
    query = request.args.get('q', '').strip()
    menu_item = ProjectCategory.query.all()
    categories = []
    selected_category = None
    if query:
        projects = Project.query.filter(Project.name.ilike(f'%{query}%')).all()
    else:
        projects = []
    projects_count = len(projects)
    categories_count = len(categories)
    return render_template(
        'projects.html',
        projects=projects,
        categories=categories,
        menu_item=menu_item,
        projects_count=projects_count,
        categories_count=categories_count,
        selected_category=selected_category
    )

@app.route('/resume')
def resumePage():
    return render_template('resume.html')

@app.route('/skills')
def skillsPage():
    return render_template('skills.html')

@app.route('/timeline')
def timelinePage():
    jobs = Job.query.order_by(Job.start_date).all()  # Oldest to newest
    return render_template('timeline.html', jobs=jobs)

# -- OCCUPATION PAGES --
@app.route('/occupation')
def occupationPage():
    return render_template('occupation/index.html')

@app.route('/occupation/blog')
def blogPage():
    return render_template('occupation/blog.html')

@app.route('/occupation/articles')
def articlesPage():
    return render_template('occupation/articles.html')

@app.route('/occupation/certificates')
def certificatesPage():
    return render_template('occupation/certificates.html')

@app.route('/occupation/charity')
def charityPage():
    return render_template('occupation/charity.html')

@app.route('/occupation/socials')
def socialsPage():
    return render_template('occupation/socials.html')

# -- PORTFOLIO PAGES --
@app.route('/portfolio')
def portfolioPage():
    return render_template('portfolio/index.html')

@app.route('/portfolio/desktop')
def desktopPage():
    return render_template('portfolio/desktop.html')

@app.route('/portfolio/mobile')
def mobilePage():
    return render_template('portfolio/mobile.html')

@app.route('/portfolio/open-source')
def openSourcePage():
    return render_template('portfolio/open-source.html')

@app.route('/portfolio/personal')
def personalPage():
    return render_template('portfolio/personal.html')

@app.route('/portfolio/web')
def webPage():
    return render_template('portfolio/web.html')


# ----------------------------------------------------------
# Creates parameters for the application to run.
# ----------------------------------------------------------
if __name__ == '__main__':
	app.run(
          debug=True,
          host='0.0.0.0',
          port=5000
          )