resource "mongodbatlas_project" "pastebin" {
  name   = "pastebin"
  org_id = "5d040bf9ff7a25dfd8faedd7"
  project_owner_id = "<OWNER_ACCOUNT_ID>"

  teams {
    team_id    = "5e0fa8c99ccf641c722fe645"
    role_names = ["GROUP_OWNER"]

  }
  teams {
    team_id    = "5e1dd7b4f2a30ba80a70cd4rw"
    role_names = ["GROUP_READ_ONLY", "GROUP_DATA_ACCESS_READ_WRITE"]
  }

  api_keys {
    api_key_id = "61003b299dda8d54a9d7d10c"
    role_names = ["GROUP_READ_ONLY"]
  }

  is_collect_database_specifics_statistics_enabled = true
  is_data_explorer_enabled                         = true
  is_performance_advisor_enabled                   = true
  is_realtime_performance_panel_enabled            = true
  is_schema_advisor_enabled                        = true
}