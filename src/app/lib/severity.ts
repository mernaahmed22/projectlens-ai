export function getSeverityClasses(severity: string) {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700 border border-red-200";
      case "High":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-700 border border-green-200";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  }