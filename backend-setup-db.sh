#!/bin/bash
# Database initialization script for WhatsApp Web

# Online database credentials
DB_HOST="sql305.infinityfree.com"
DB_USER="u942725982_whatsapp_datta"
DB_PASSWORD="Meehir@8802"
DB_NAME="u942725982_whatsapp_web"

# Create database and tables
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

# Import schema
mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME < schema.sql

echo "Database setup completed!"
