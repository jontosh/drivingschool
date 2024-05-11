Router = {
    "interaction":{
        "base":"interaction/",
        "children":{
            "question":"question/",
            "question_type":"question_type/",
            "test":"test/",
            "answer":"answer/",
            "task":"task/",
            "email_templates":"email_templates/",
            "logs":"logs/",
            "latest_news":"latest_news/",
        }
    },
    "location":{
        "base":"location/",
        "children":{
            "schools":"schools/",
            "class":"class/",
            "location":"location/",
            "vehicle":"vehicle/",
            "location_small":"location_small/",
        }
    },
    "services":{
        "base":"services/",
        "children":{
            "add_on":"add_on/",
            "component":"component/",
            "fee":"fee/",
            "service":"service/",
            "discount":"discount/",
        }
    },
    "configurations": {
        "base": "configurations/",
        "children": {
            "company":"company",
            "zipcode":"zipcode",
            "storage_management":"storage_management",
            "web_content":"web_content",
            "emergency_data":"emergency_data",
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
    "users":{
        "base":"users/",
        "children":{
            "time_range":"time_range/",
            "instructor":"instructor/",
            "student":"student/",
            "time_slot":"time_slot/",
            "week_range":"week_range/",
            "timeOff":"timeOff/",
            "date_range":"date_range/",
            "enrollment":"enrollment/",
            "appointment":"appointment/",
            "file_category":"file_category/",
            "how_did_you_hear_us":"how_did_you_hear_us/",
            "user_type":"user_type/",
            "files":"files/",
            "bill":"bill/",
        }
    },
    "main_admin":{
        "base":"main_admin/",
        "children":{

        }
    },
    "statistics":{
        "base":"statistics/",
        "children":{
            "expanses":"expanses",
            "bill":"bill",
        }
    }
    #TODO:       statistics
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