function toVal(mix) {
  let k
  let y
  let str = ''

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          y = toVal(mix[k])
          if (y) {
            str && (str += ' ')
            str += y
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += ' ')
          str += k
        }
      }
    }
  }

  return str
}

export const clsx = (...rest: any[]) => {
  let i = 0
  let tmp
  let x
  let str = ''

  while (i < rest.length) {
    tmp = rest[i++]
    if (tmp) {
      x = toVal(tmp)
      if (x) {
        str && (str += ' ')
        str += x
      }
    }
  }

  return str
}

export const dispatchForCode = function (event, callback) {
  var code

  if (event.key !== undefined) {
    code = event.key
  } else if (event.keyIdentifier !== undefined) {
    code = event.keyIdentifier
  } else if (event.keyCode !== undefined) {
    code = event.keyCode
  }

  callback(code)
}

/**
 * Click Outside
 * @param {Node} node
 */
/**https://github.com/TheComputerM/svelte-materialify/blob/54e4fdb8707caf0c44b4831abfbdd6eb8f5c1208/packages/svelte-materialify/src/actions/ClickOutside/index.js */
interface ClickOutsideOptions {
  include?: HTMLElement[]
}

interface ClickOutsideReturn {
  destroy(): void
}

export function ClickOutside(
  node: HTMLElement,
  _options: ClickOutsideOptions = {}
): ClickOutsideReturn {
  const options = { include: [], ..._options }
  function detect({ target }) {
    if (
      !node.contains(target) ||
      options.include.some((i) => target.isSameNode(i))
    ) {
      node.dispatchEvent(new CustomEvent('clickOutside'))
    }
  }
  document.addEventListener('click', detect, {
    passive: true,
    capture: true
  })
  return {
    destroy() {
      document.removeEventListener('click', detect)
    }
  }
}
