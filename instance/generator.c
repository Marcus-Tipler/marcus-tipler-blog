#include <stdio.h>
#include <sqlite3.h>

int main() {
    sqlite3 *db;
    char *err_msg = 0;

    int rc = sqlite3_open("mft-db.sqlite3", &db);

    if (rc != SQLITE_OK) {
        printf("Cannot open database: %s\n", sqlite3_errmsg(db));
        return 1;
    }

    const char *sql =
        // PROJECTS
        "CREATE TABLE IF NOT EXISTS projects ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "name TEXT,"
        "description TEXT,"
        "category TEXT,"
        "status TEXT,"
        "start_date TEXT,"
        "updated_at TEXT,"
        "priority INTEGER,"
        "tags TEXT,"
        "progress INTEGER,"
        "picture_count INTEGER,"
        "link TEXT"
        ");"

        // JOBS
        "CREATE TABLE IF NOT EXISTS jobs ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "title TEXT,"
        "company TEXT,"
        "location TEXT,"
        "start_date TEXT,"
        "end_date TEXT,"
        "description TEXT"
        ");"

        // CERTIFICATES
        "CREATE TABLE IF NOT EXISTS certificates ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "name TEXT,"
        "issuer TEXT,"
        "issue_date TEXT,"
        "start_date TEXT,"
        "expiry_date TEXT,"
        "credential_link TEXT,"
        "credential_id TEXT,"
        "description TEXT"
        ");"

        // EDUCATION
        "CREATE TABLE IF NOT EXISTS education ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "institution TEXT,"
        "degree TEXT,"
        "field_of_study TEXT,"
        "start_date TEXT,"
        "end_date TEXT,"
        "description TEXT"
        ");"

        // SKILLS
        "CREATE TABLE IF NOT EXISTS skills ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "name TEXT,"
        "category TEXT,"
        "proficiency TEXT,"
        "description TEXT"
        ");"

        // EVENTS
        "CREATE TABLE IF NOT EXISTS events ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "title TEXT,"
        "type TEXT,"
        "description TEXT,"
        "article TEXT,"
        "date TEXT,"
        "location TEXT,"
        "image_count INTEGER,"
        "company_or_charity TEXT,"
        "url TEXT,"
        "amount_raised REAL,"
        "created_at TEXT,"
        "updated_at TEXT,"
        "is_published INTEGER,"
        "publisher TEXT"
        ");"

        // SOCIALS
        "CREATE TABLE IF NOT EXISTS socials ("
        "id INTEGER PRIMARY KEY AUTOINCREMENT,"
        "platform TEXT,"
        "svg TEXT,"
        "username TEXT,"
        "profile_url TEXT,"
        "description TEXT,"
        "created_at TEXT,"
        "is_active INTEGER"
        ");"
    ;

    rc = sqlite3_exec(db, sql, 0, 0, &err_msg);

    if (rc != SQLITE_OK ) {
        printf("SQL error: %s\n", err_msg);
        sqlite3_free(err_msg);
        sqlite3_close(db);
        return 1;
    }

    printf("Database and tables created successfully.\n");
    sqlite3_close(db);

    return 0;
}

// To run this script, all you have to do is compile in the command line by typing 'gcc generator.c -lsqlite3 -o create_schema' and then execute using ./create_schema