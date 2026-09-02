import csv
import random
import os

random.seed(42)

# ---------------------------------------------------
# Ticket templates
# ---------------------------------------------------

templates = {
    "Hardware": {
        "subjects": [
            "Laptop not turning on",
            "Keyboard not working",
            "Mouse not responding",
            "Monitor not displaying",
            "Printer not working",
            "Laptop overheating",
            "Computer running slowly",
            "Hard drive issue",
            "Laptop battery problem",
            "Headset not working",
        ],
        "descriptions": [
            "My laptop does not turn on when I press the power button.",
            "Several keys on my keyboard have stopped working.",
            "My mouse is connected but is not responding.",
            "The monitor is connected but nothing is displayed.",
            "The office printer is not printing my documents.",
            "My laptop is getting very hot during normal usage.",
            "My computer has become extremely slow recently.",
            "I am having problems with the hard drive on my computer.",
            "My laptop battery is draining very quickly.",
            "My headset is not detected by my computer.",
        ],
    },

    "Software": {
        "subjects": [
            "Application keeps crashing",
            "Software installation failed",
            "Windows error",
            "Browser not working",
            "Application freezing",
            "Software update failed",
            "Program will not open",
            "Excel not responding",
            "Application showing error",
            "Software compatibility issue",
        ],
        "descriptions": [
            "The application crashes every time I try to open it.",
            "I am unable to install the required software on my computer.",
            "Windows is showing an unexpected error message.",
            "My web browser is not working correctly.",
            "The application freezes whenever I try to use it.",
            "The latest software update failed to install.",
            "The program refuses to open on my laptop.",
            "Excel stops responding when I open a large spreadsheet.",
            "The application displays an error whenever I perform an operation.",
            "The software does not appear to be compatible with my system.",
        ],
    },

    "Network": {
        "subjects": [
            "Wi-Fi not working",
            "Internet connection unavailable",
            "VPN connection failed",
            "Network connection dropping",
            "Slow internet",
            "Cannot connect to office network",
            "DNS problem",
            "Network timeout",
            "Unable to access server",
            "Wi-Fi keeps disconnecting",
        ],
        "descriptions": [
            "My laptop is unable to connect to the office Wi-Fi.",
            "I do not have access to the internet.",
            "I cannot connect to the company VPN from home.",
            "The network connection keeps dropping frequently.",
            "The internet connection is extremely slow.",
            "My computer cannot connect to the company network.",
            "I am having a DNS resolution problem.",
            "Network requests are timing out repeatedly.",
            "I cannot connect to the company server.",
            "The Wi-Fi disconnects every few minutes.",
        ],
    },

    "Account": {
        "subjects": [
            "Forgot password",
            "Account locked",
            "Password reset required",
            "Cannot login",
            "Username issue",
            "Account recovery request",
            "Password expired",
            "Unable to authenticate",
            "Employee account problem",
            "Login credentials not working",
        ],
        "descriptions": [
            "I forgot my company account password and need it reset.",
            "My account has been locked after several unsuccessful login attempts.",
            "I need assistance resetting my account password.",
            "I cannot log into my company account.",
            "I am having an issue with my username.",
            "I need help recovering my company account.",
            "My password has expired and I cannot access my account.",
            "The system is unable to authenticate my account.",
            "There appears to be a problem with my employee account.",
            "My login credentials are not being accepted.",
        ],
    },

    "Security": {
        "subjects": [
            "Suspicious email received",
            "Possible phishing attack",
            "Unknown login detected",
            "Malware warning",
            "Security alert",
            "Suspicious attachment",
            "Possible virus",
            "Unauthorized access",
            "Security incident",
            "Phishing link received",
        ],
        "descriptions": [
            "I received a suspicious email that appears to be a phishing attempt.",
            "I think I may have received a phishing message.",
            "I received an alert about an unknown login to my account.",
            "My computer is showing a possible malware warning.",
            "I received a security alert that I do not recognize.",
            "An unknown sender sent me a suspicious attachment.",
            "I think my computer may have a virus.",
            "There may have been unauthorized access to my account.",
            "I would like to report a potential security incident.",
            "I received an email containing a suspicious link.",
        ],
    },

    "Email": {
        "subjects": [
            "Cannot send email",
            "Cannot receive email",
            "Outlook not opening",
            "Email attachment problem",
            "Mailbox full",
            "Emails delayed",
            "Outlook keeps crashing",
            "Email synchronization issue",
            "Cannot access mailbox",
            "Email notifications not working",
        ],
        "descriptions": [
            "I cannot send emails from my company account.",
            "New emails are not appearing in my inbox.",
            "Outlook does not open when I click on it.",
            "I am unable to send an email attachment.",
            "My mailbox is full and I cannot receive new messages.",
            "My emails are being delivered very slowly.",
            "Outlook crashes whenever I try to launch it.",
            "My emails are not synchronizing correctly.",
            "I cannot access my company mailbox.",
            "I am not receiving notifications for new emails.",
        ],
    },

    "Access": {
        "subjects": [
            "Shared folder access denied",
            "Application permission required",
            "Cannot access database",
            "Server access denied",
            "File permission issue",
            "Access to shared drive required",
            "Unable to access application",
            "Permission request",
            "Access denied error",
            "Need access to company system",
        ],
        "descriptions": [
            "I cannot access the shared folder used by my team.",
            "I need permission to use the required company application.",
            "I am unable to access the company database.",
            "Access to the server is being denied.",
            "I cannot open an important file because of permission restrictions.",
            "I need access to the team's shared drive.",
            "The application says that I do not have permission to access it.",
            "I would like to request access to a company resource.",
            "I receive an access denied error when opening the resource.",
            "I need access to an internal company system.",
        ],
    },

    "Other": {
        "subjects": [
            "General IT request",
            "IT assistance required",
            "New equipment request",
            "Technical help needed",
            "General support request",
            "IT information request",
            "Computer setup request",
            "New employee IT setup",
            "Equipment replacement request",
            "Miscellaneous IT issue",
        ],
        "descriptions": [
            "I need general assistance with an IT-related issue.",
            "Please provide technical support for my workstation.",
            "I would like to request new computer equipment.",
            "I need help with a technical problem.",
            "I have a general IT support request.",
            "I need some information regarding an IT service.",
            "I need assistance setting up a new computer.",
            "A new employee needs their computer and IT services configured.",
            "I need to request replacement IT equipment.",
            "I have an IT issue that does not fit into another category.",
        ],
    },
}


# ---------------------------------------------------
# Priority generation
# ---------------------------------------------------

def generate_priority(category):
    if category == "Security":
        return random.choice(["HIGH", "HIGH", "CRITICAL", "MEDIUM"])

    if category == "Network":
        return random.choice(["MEDIUM", "HIGH", "HIGH", "LOW"])

    if category == "Email":
        return random.choice(["LOW", "MEDIUM", "HIGH"])

    if category == "Hardware":
        return random.choice(["LOW", "MEDIUM", "MEDIUM", "HIGH"])

    if category == "Account":
        return random.choice(["LOW", "MEDIUM", "HIGH"])

    if category == "Access":
        return random.choice(["LOW", "MEDIUM", "HIGH"])

    if category == "Software":
        return random.choice(["LOW", "MEDIUM", "MEDIUM", "HIGH"])

    return random.choice(["LOW", "MEDIUM", "MEDIUM", "HIGH"])


# ---------------------------------------------------
# Generate tickets
# ---------------------------------------------------

tickets = []

tickets_per_category = 100

for category, data in templates.items():

    for i in range(tickets_per_category):

        subject = random.choice(data["subjects"])
        description = random.choice(data["descriptions"])
        priority = generate_priority(category)

        # Add small variations to make tickets less identical
        variations = [
            "",
            " Please help me resolve this issue.",
            " This is affecting my work.",
            " I need assistance as soon as possible.",
            " Please investigate this problem.",
            " The issue started recently.",
        ]

        description += random.choice(variations)

        tickets.append({
            "subject": subject,
            "description": description,
            "category": category,
            "priority": priority
        })


# Shuffle dataset
random.shuffle(tickets)


# ---------------------------------------------------
# Save CSV
# ---------------------------------------------------

output_directory = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "data"
)

os.makedirs(output_directory, exist_ok=True)

output_file = os.path.join(
    output_directory,
    "tickets.csv"
)


with open(output_file, "w", newline="", encoding="utf-8") as file:

    writer = csv.DictWriter(
        file,
        fieldnames=[
            "subject",
            "description",
            "category",
            "priority"
        ]
    )

    writer.writeheader()
    writer.writerows(tickets)


print("====================================")
print("Dataset generated successfully!")
print("====================================")
print(f"Total tickets: {len(tickets)}")
print(f"Output file: {output_file}")
print()
print("Categories:")

for category in templates:
    print(f"{category}: {tickets_per_category}")

print()
print("Columns:")
print("subject")
print("description")
print("category")
print("priority")