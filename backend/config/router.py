Router = {
    "authentication":{
        "base":"authentication/",
        "methods":["GET","POST","OTHER METHODS BLOCKED"],
        "descriptions":"Here we provide login url to obtain token for api interaction. ",
        "note":"<li>From now on, you have to be loged in to enter API DOCUMENTATION. First you have to send request "
               "<span>obtain_auth_token/</span> with <span>username/</span> and <span>password/</span> then access to other pages.</li><br>"
               "<li><span>login/</span> made for searching in <span class='highlight-red'>API DOCUMENTATION</span>, "
               "you will enter by some  username and password then you can access to other API endpoints</li>"
               "<li>Only <span>GET</span> and <span>POST</span> methods are allowed other will end up with <span class='highlight-red'>ERROR</span></li>"
               "<li>if you are web scrolling <span class='highlight-red'>do not forget logout</span> it will cause to interruption of signals</li>",
        "children":{
            "login":"login/",
            "logout":"logout/",
            "obtain_auth_token":"obtain_auth_token/",
        }
    },
    "communication":{
        "base":"communication/",
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the communication part of our website",
        "note":"If you access this API, you will receive all data. Adding <span>ID</span> after the endpoint will retrieve specific data of that model.",
        "children":{
            "task":"task",
            "logs":"logs",
            "latest_news":"latest_news",
        }
    },
    "account_management":{
        "base":"account_management/",
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the account management part of our website",
        "note":"If you access this API, you will receive all data. Adding <span>ID</span> after the endpoint will retrieve specific data of that model.",
        "children":{
            "schools":"schools",
            "class":"class",
            "location":"location",
            "vehicle":"vehicle",
            "location_small":"location_small",
            "how_did_you_hear_us":"how_did_you_hear_us"
        }
    },
    "services":{
        "base":"account_management/services/",
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the services part of our website. And it is child of account management. because of its size we divided it to 2 parts",
        "note":"Attempting to reach <span>services/</span> endpoint will be result with <span class='highlight-red'>ERROR</span>",
        "children":{
            "add_on":"add_on",
            "component":"component",
            "fee":"fee",
            "service":"service",
            "discount":"discount",
            "question":"question",
            "question_type":"question_type",
            "test":"test",
            "answer":"answer",
        }
    },
    "configuration": {
        "base": "configuration/",
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the configuration part of our website",
        "note":"If you access this API, you will receive all data. Adding <span>ID</span> after the endpoint will retrieve specific data of that model.",
        "children": {
            "company":"company",
            "zipcode":"zipcode",
            "storage_management":"storage_management",
            "web_content":"web_content",
            "emergency_data": "emergency_data",
            "messages_items":"messages_items",
            "messages":"messages",
            "fields":"fields",
            "password_management":"password_management",
            "graph_settings":"graph_settings",
            "general_settings":"general_settings",
            "instructions":"instructions",
            "expanses":"expanses",
        }
    },
    "student_account":{
        "base":"student_account/",
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the student account part of our website",
        "note":"If you access this API, you will receive all data. Adding <span>ID</span> after the endpoint will retrieve specific data of that model.",

        "children":{
            "instructor":"instructor",
            "student":"student",
            "enrollment":"enrollment",
            "file_category":"file_category",
            "user_type":"user_type",
            "files":"files",
            "bill":"bill",
        }
    },
    "main_admin":{
        "base":"main_admin/",
        "methods":["GET","REST METHODS ARE BLOCKED"],
        "descriptions":"This api represents domain and database schema name of each website. This side only can be changed via backend and super-admin panel",
        "note":"Any attempt to <span>POST</span>  <span>DELETE</span>  <span>UPDATE</span> will result with  <span class='highlight-red'>ERROR</span>",

        "children":{

        }
    },
    "statistics":{
        "base":"statistics/",
        "methods":["GET","REST METHODS ARE BLOCKED"],
        "descriptions":"This api automatically generated by backend for this reason there only get method. ",
        "note":"Any attempt to <span>POST</span>  <span>DELETE</span>  <span>UPDATE</span> will result with  <span class='highlight-red'>ERROR</span>",

        "children":{
            "expanses":"expanses",
            "bill":"bill",
        }
    },
    "page_api":{
        "base":"page_api/",
        "methods":["GET","REST METHODS ARE BLOCKED"],
        "descriptions":"Here we provide simple URLs to get page base api this is longest api and here you can create or delete. This api designed only for get method ",
        "note":"<li>If you request to <span>student_email_templates/</span> or <span>instructor_email_templates/</span> you will get the list of available variables for email templates </li>"
               "<li>if you provide UUID after <span class='highlight-red'>/</span> then you will get all data belongs to student or instructor </li>"
               "<li>In <span>email_template/</span> you can do <span class=>POST</span><span class=>UPDATE</span><span class=>DELETE</span> but should not forget that you can only provide <span class='highlight-red'>Student</span> or <span class='highlight-red'>Instructor</span> never leave them blank and never provide both of them. You have to provide only one of them else you will end up with <span class='highlight-red'>ERROR</span></li>"
               "<li>Providing wrong UUID or ID and requesting <span class=>POST</span><span class=>UPDATE</span><span class=>DELETE</span> methods will end up with <span class='highlight-red'>ERROR</span></li><br>",

        "children":{
            "email_template":"email_template",
            "student_list_email_templates":    "student_email_templates",
            "instructor_list_email_templates": "instructor_email_templates",
            "instructor":"instructor/<str:id>/",
            "student":"student/<str:id>/",
            "student_email_templates":"student_email_templates/<str:UUID>/",
            "instructor_email_templates":"instructor_email_templates/<str:UUID>/",



        }
    },
    "scheduling":{
        "base":"scheduling/",
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the scheduling part of our website",
        "note":"If you access this API, you will receive all data. Adding <span>ID</span> after the endpoint will retrieve specific data of that model.",
        "children":{
            "time_slot":"time_slot",
            "week_range":"week_range",
            "timeOff":"timeOff",
            "date_range":"date_range",
            "appointment":"appointment",
            "time_range":"time_range",
        }
    },
    "abstracts":{
        "base":"",
        "methods":["ALL METHODS ARE BLOCKED"],
        "descriptions":"Here we provide abstract classes because of abstractness of this model we can not provide api for as for this reason mainly this block will be empty",
        "note":"If you request to get <span>abstracts/</span> you will get <span class='highlight-red'>ERROR</span>",
        "children":{
            "":""
        }
    },

}

def get_route_url(route_name, child_name=None):
  """
  Retrieves a URL based on the route name and optional child name.
  """
  if route_name not in Router:
    raise ValueError(f"Invalid route name: {route_name}")

  route_data = Router[route_name]

  if child_name:
    if "children" not in route_data or child_name not in route_data["children"]:
      raise ValueError(f"Invalid child name for route '{route_name}': {child_name}")
    return f"{route_data['base']}{route_data['children'][child_name]}"

  return route_data.get("base", route_name)