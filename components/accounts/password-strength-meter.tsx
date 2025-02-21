import { useState, useEffect } from 'react'
import zxcvbn from 'zxcvbn'

type PasswordStrengthMeterProps = {
  password: string
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    setStrength(zxcvbn(password).score)
  }, [password])

  const getColor = () => {
    switch (strength) {
      case 0: return 'bg-red-500'
      case 1: return 'bg-orange-500'
      case 2: return 'bg-yellow-500'
      case 3: return 'bg-blue-500'
      case 4: return 'bg-green-500'
      default: return 'bg-gray-300'
    }
  }

  const getLabel = () => {
    switch (strength) {
      case 0: return 'Very Weak'
      case 1: return 'Weak'
      case 2: return 'Fair'
      case 3: return 'Strong'
      case 4: return 'Very Strong'
      default: return ''
    }
  }

  return (
    <div className="space-y-2">
      <div className="h-2 w-full bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full ${getColor()}`}
          style={{ width: `${(strength + 1) * 20}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">Password strength: {getLabel()}</p>
    </div>
  )
}

