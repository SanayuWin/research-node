const fs = require('fs');
const path = require('path');
const db = require('../config/db');

exports.generate = async (req, res) => {

  try {
  
    var firstName = generateRandomName();
    var lastName = generateRandomName();
    var fullName = firstName + lastName;
    var randomUrl = `https://randomurl.com/${fullName}`;
    var dataRow = {
      "First_Name": firstName,
      "Last_Name": lastName,
      "Email": generateRandomEmail(fullName),
      "Date_of_Birth": generateRandomDate(),
      "Gender": generateRandomGender(),
      "Country": generateRandomCountry(),
      "Annual_Income": generateRandomIncome(),
      "Registration_Date": generateRandomDate(),
      "Purchase_Type": generateRandomPurchaseType(),
      "URL_Temp": randomUrl
    };

    try {
      const query = `
        INSERT INTO customers (
          first_name, last_name, email, date_of_birth, gender, 
          country, annual_income, registration_date, purchase_type, url_temp
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        )
      `;
      await db.query(query, Object.values(dataRow));
      successCount++;
    } catch (insertError) {
      console.error('Error inserting data:', insertError);
    }
   
    
    res.status(200).json({ 
      msg: `Successfully insert` 
    });
    return;
  } catch (error){
    console.error('Error reading data.json:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
    return false;
  }
}

exports.previewData = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM customers');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

exports.removeData = async (req, res) => {
  try {
    const { rows } = await db.query('DELETE FROM customers');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}


function generateRandomName() {
  const names = [
    "Alice", "Bob", "Charlie", "David", "Eva",
    "Olivia", "Liam", "Emma", "Noah", "Ava",
    "Sophia", "William", "Isabella", "James", "Charlotte",
    "Benjamin", "Amelia", "Lucas", "Mia", "Henry",
    "Harper", "Ethan", "Evelyn", "Alexander", "Abigail",
    "Mason", "Emily", "Michael", "Ella", "Daniel",
    "Elizabeth", "Jacob", "Camila", "Logan", "Luna",
    "Jackson", "Sofia", "Sebastian", "Avery", "Jack",
    "Scarlett", "Aiden", "Victoria", "Owen", "Madison",
    "Samuel", "Luna", "Matthew", "Grace", "Joseph",
    "Chloe", "Levi", "Penelope", "Mateo", "Layla"
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function generateRandomEmail(firstName) {
  return `${firstName.toLowerCase()}@example.com`;
}
function generateRandomDate() {
  const start = new Date(1970, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}
function generateRandomGender() {
  const genders = ["Male", "Female", "Other"];
  return genders[Math.floor(Math.random() * genders.length)];
}

function generateRandomCountry() {
  const countries = ["USA", "Canada", "UK", "Australia", "Germany"];
  return countries[Math.floor(Math.random() * countries.length)];
}

function generateRandomIncome() {
  return Math.floor(Math.random() * 100000) + 20000; // Random income between 20,000 and 120,000
}

function generateRandomPurchaseType() {
  const types = [
    "Electronics", "Clothing", "Groceries", "Books", "Others",
    "Home and Garden", "Toys and Games", "Sports Equipment", "Health and Beauty",
    "Automotive", "Jewelry", "Office Supplies", "Pet Supplies", "Footwear",
    "Music and Movies", "Art and Craft Supplies", "Kitchenware", "Travel Accessories",
    "Fitness Gear", "Digital Services"
  ];
  return types[Math.floor(Math.random() * types.length)];
}
