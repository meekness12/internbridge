-- 1. Create the COMPANY table
CREATE TABLE COMPANY (
    Company_ID INT PRIMARY KEY AUTO_INCREMENT, -- Added as a surrogate primary key
    Company_Name VARCHAR(255) NOT NULL,
    Industry VARCHAR(100)
);

-- 2. Create the STUDENT table
CREATE TABLE STUDENT (
    Reg_Number VARCHAR(50) PRIMARY KEY,        -- Natural primary key
    Name VARCHAR(255) NOT NULL,
    Department VARCHAR(100)
);

-- 3. Create the INTERNSHIP table
-- Represents the "POSTS" 1:N relationship by including Company_ID
CREATE TABLE INTERNSHIP (
    Internship_ID INT PRIMARY KEY AUTO_INCREMENT, -- Added as a surrogate primary key
    Title VARCHAR(255) NOT NULL,
    Deadline DATE,
    Company_ID INT,                            -- Foreign Key linking to COMPANY
    FOREIGN KEY (Company_ID) REFERENCES COMPANY(Company_ID)
);

-- 4. Create the LOGBOOK table
-- Represents the "RECORDS" 1:N relationship by including Reg_Number
CREATE TABLE LOGBOOK (
    Logbook_ID INT PRIMARY KEY AUTO_INCREMENT, -- Added as a surrogate primary key
    Date DATE NOT NULL,
    Hours DECIMAL(5,2) NOT NULL,
    Reg_Number VARCHAR(50),                    -- Foreign Key linking to STUDENT
    FOREIGN KEY (Reg_Number) REFERENCES STUDENT(Reg_Number)
);

-- 5. Create the APPLIES junction table
-- Resolves the M:N relationship between STUDENT and INTERNSHIP
CREATE TABLE APPLIES (
    Reg_Number VARCHAR(50),
    Internship_ID INT,
    CV_File VARCHAR(255),                      -- Attribute from the APPLIES relationship
    Status VARCHAR(50),                        -- Attribute from the APPLIES relationship
    PRIMARY KEY (Reg_Number, Internship_ID),   -- Composite Primary Key
    FOREIGN KEY (Reg_Number) REFERENCES STUDENT(Reg_Number),
    FOREIGN KEY (Internship_ID) REFERENCES INTERNSHIP(Internship_ID)
);