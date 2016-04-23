export default function(part, string, searchSubstring, caseSensitive) {
	if (!string) return false
	if (!caseSensitive) {
		string = string.toLowerCase()
		part = part.toLowerCase()
	}
	return searchSubstring ?
		string.indexOf(part) != -1 :
		string.slice(0, part.length) == part
}
