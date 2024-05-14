Router = {
    "communication":{
        "base":"communication/",
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the communication part of our website",
        "note":"If you access this API, you will receive all data. Adding <span>ID</span> after the endpoint will retrieve specific data of that model.",
        "children":{
            "task":"task",
            "email_templates":"email_templates",
            "logs":"logs",
            "latest_news":"latest_news",
        }
    },
    "account_management":{
        "base":"account_management/",
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the communication part of our website",
        "note":"If you access this API, you will receive all data. Adding <span>ID</span> after the endpoint will retrieve specific data of that model.",

        "children":{
            "schools":"schools",
            "class":"class",
            "location":"location",
            "vehicle":"vehicle",
            "location_small":"location_small",
            "how_did_you_hear_us":"how_did_you_hear_us/"
        }
    },
    "services":{
        "base":"account_management/services/",
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the communication part of our website",
        "note":"If you access this API, you will receive all data. Adding <span>ID</span> after the endpoint will retrieve specific data of that model.",

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
        "descriptions":"Here we provide simple URLs to represent the communication part of our website",
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
        "descriptions":"Here we provide simple URLs to represent the communication part of our website",
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
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the communication part of our website",
        "note":"If you access this API, you will receive all data. Adding <span>ID</span> after the endpoint will retrieve specific data of that model.",

        "children":{

        }
    },
    "statistics":{
        "base":"statistics/",
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the communication part of our website",
        "note":"If you access this API, you will receive all data. Adding <span>ID</span> after the endpoint will retrieve specific data of that model.",

        "children":{
            "expanses":"expanses",
            "bill":"bill",
        }
    },
    "scheduling":{
        "base":"scheduling/",
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the communication part of our website",
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
        "methods":["POST","GET","UPDATE","DELETE"],
        "descriptions":"Here we provide simple URLs to represent the communication part of our website",
        "note":"If you access this API, you will receive all data. Adding <span>ID</span> after the endpoint will retrieve specific data of that model.",

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