import sqlite3
import random
from argparse import ArgumentParser

def main(conn_str: str):

    # Connect to a new SQLite database in memory
    conn = sqlite3.connect(conn_str)
    c = conn.cursor()

    c.execute("DROP TABLE IF EXISTS records")

    # Create a new table with the specified fields
    c.execute('''
        CREATE TABLE records (
            id INTEGER PRIMARY KEY,
            partner TEXT NOT NULL,
            client TEXT NOT NULL,
            hours REAL NOT NULL,
            status TEXT CHECK(status IN ('billed', 'pending'))
        )
    ''')

    # Commit the changes
    conn.commit()


    # Update sample data with Indian names for Partners and Clients
    partners = ["Aarav", "Priya", "Rohan", "Deepika", "Vivek"]
    clients = ["TechSolutions", "HealthCare Pvt Ltd", "EduTutors", "GreenEnergy Corp", "FinBank Services"]
    statuses = ["billed", "pending"]

    # Generate 20 rows of sample data
    sample_data_indian = []
    for _ in range(20):
        partner = random.choice(partners)
        client = random.choice(clients)
        hours = random.choice([x * 0.5 for x in range(1, 41)])  # 0.5 to 20 with 0.5 increments
        status = random.choice(statuses)
        sample_data_indian.append((partner, client, hours, status))

    # Insert the sample data with Indian names into the table
    c.executemany("INSERT INTO records (partner, client, hours, status) VALUES (?, ?, ?, ?)", sample_data_indian)
    conn.commit()

if __name__ == '__main__':
    # get the path to the database from command line argument db_path

    parser = ArgumentParser()
    parser.add_argument('--db-path', type=str, default=':memory:', help='Path to the database')
    args = parser.parse_args()

    main(args.db_path)

    print("Created database with sample data successfully")


