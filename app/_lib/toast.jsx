// utils/toast.js
import { toast } from "sonner"
import { CircleCheck, X, AlertCircle } from "lucide-react"

const toastStyles = {
  success: {
    icon: CircleCheck,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50 border-emerald-200",
  },
  error: {
    icon: AlertCircle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50 border-red-200",
  },
}

export const showToast = ({ type, message, actions = [] }) => {
  const style = toastStyles[type]
  const IconComponent = style.icon

  toast.custom((t) => (
    <div className={`${style.bgColor} text-foreground w-full rounded-md border px-4 py-3 shadow-lg sm:w-[var(--width)]`}>
      <div className="flex gap-2">
        <div className="flex grow gap-3">
          <IconComponent
            className={`mt-0.5 shrink-0 ${style.iconColor}`}
            size={16}
            aria-hidden="true"
          />
          <div className="flex grow justify-between gap-12">
            <p className="text-sm">{message}</p>
            {actions.length > 0 && (
              <div className="text-sm whitespace-nowrap">
                {actions.map((action, index) => (
                  <span key={index}>
                    <button
                      className="text-sm font-medium hover:underline"
                      onClick={action.onClick}
                    >
                      {action.label}
                    </button>
                    {index < actions.length - 1 && (
                      <span className="text-muted-foreground mx-1">·</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0  flex items-center justify-center rounded-md hover:bg-gray-100"
          onClick={() => toast.dismiss(t)}
          aria-label="Close notification"
        >
          <X
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  ))
}

// Convenience functions
export const showSuccessToast = (message, actions) => {
  showToast({ type: "success", message, actions })
}

export const showErrorToast = (message, actions) => {
  showToast({ type: "error", message, actions })
}